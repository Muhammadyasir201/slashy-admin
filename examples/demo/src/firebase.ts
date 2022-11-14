import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyAWYYflLbdPPdIwqhomymF7EtYWeUZWIl0',
    authDomain: 'slashy-e5b6b.firebaseapp.com',
    databaseURL: 'https://slashy-e5b6b.firebaseio.com',
    projectId: 'slashy-e5b6b',
    storageBucket: 'slashy-e5b6b.appspot.com',
    messagingSenderId: '148416985775',
    appId: '1:148416985775:web:023663f5e86f9f40c9725a',
    measurementId: 'G-ET874E0LNF',
};
firebase.initializeApp(config);

export default firebase;
