import { BASE_URL } from './constants';
import { AuthProvider } from 'react-admin';
import { firebaseInit } from './firebaseHelper';

const authProvider: AuthProvider = {
    login: ({ username, password }) => {
        const request = new Request(`${BASE_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ admin_id: username, password: password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(response => {
                if (response.data.access_token) {
                    localStorage.setItem('username', username);
                    localStorage.setItem('name', response.data.name);
                    localStorage.setItem('avatar', response.data.avatar);
                    localStorage.removeItem('not_authenticated');
                    localStorage.setItem('auth', JSON.stringify(response.data));
                    firebaseInit();
                    return Promise.resolve();
                }
                localStorage.setItem('not_authenticated', 'true');
                return Promise.reject();
            });
    },
    logout: () => {
        localStorage.clear();
        localStorage.setItem('not_authenticated', 'true');
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        return status === 401 || status === 403
            ? Promise.reject()
            : Promise.resolve();
    },
    // checkError: () => Promise.resolve(),
    // checkAuth: () =>
    //     localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),
    checkAuth: () => {
        const auth = localStorage.getItem('auth');
        if (auth !== null) {
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    },
    getPermissions: () => Promise.reject('Unknown method'),
    getIdentity: () =>
        Promise.resolve({
            id: 'user',
            fullName: localStorage.getItem('name')?.toString(),
            avatar: localStorage.getItem('avatar')?.toString(),
        }),
};

export default authProvider;
