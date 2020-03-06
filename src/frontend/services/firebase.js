import * as firebase from "firebase/app"

// Add the Firebase services that you want to use
import "firebase/auth"
import "firebase/firestore"

import firebaseConfig from '../config/firebase'
firebase.initializeApp(firebaseConfig)

export default firebase