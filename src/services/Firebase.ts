declare var firebase;

/**
 * Firebase keys and api configs
 */
export const FIREBASE_CONF = {
    apiKey: 'AIzaSyC4uIFN4TMghyt-jgQFh9rfbmXPxBKXCbw',
    authDomain: 'image-tester-template.firebaseapp.com',
    projectId: 'image-tester-template',
    storageBucket: 'image-tester-template.appspot.com',
    messagingSenderId: '1046844901638',
    appId: '1:1046844901638:web:efb5778daf1bef0fc7b687',
    measurementId: 'G-03KG2FV53S',
};

export default !firebase.apps.length ? firebase.initializeApp(FIREBASE_CONF) : firebase.app();
