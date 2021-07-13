declare var firebase;

/**
 * Firebase keys and api configs
 */
export const FIREBASE_CONF = {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    databaseURL: '',
}

export default !firebase.apps.length ? firebase.initializeApp(FIREBASE_CONF) : firebase.app();
