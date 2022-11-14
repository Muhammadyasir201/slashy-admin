import firebase from './firebase';
import { BASE_URL } from './constants';
const { access_token } = JSON.parse(localStorage.getItem('auth') || '{}');

const firebaseInit = () => {
    if (isPushNotificationSupported()) {
        const messaging = firebase.messaging();

        messaging
            .requestPermission()
            .then(() => {
                return messaging.getToken();
            })
            .then(token => {
                console.log({ token });
                const payload = {
                    deviceId: token,
                };
                sendFcmTokenToServer(payload);
            })
            .catch(e => {
                console.log({ e });
            });

        messaging.onTokenRefresh(token => {
            const payload = {
                deviceId: token,
            };
            sendFcmTokenToServer(payload);
        });
    }
};

function sendFcmTokenToServer(deviceId: any) {
    fetch(`${BASE_URL}/update-deviceid`, {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${access_token}`,
        },
        method: 'POST',
        body: JSON.stringify(deviceId),
    })
        .then(response => {
            console.log(response);
            if (response.status == 200) {
            }
        })
        .catch(e => {})
        .finally(() => {});
}

function isPushNotificationSupported() {
    return 'serviceWorker' in navigator && 'PushManager' in window;
}

export { firebaseInit, isPushNotificationSupported };
