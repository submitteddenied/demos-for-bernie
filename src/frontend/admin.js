import React from "react"
import ReactDOM from "react-dom"
import AdminComponent from './components/AdminComponent'
import firebase from './services/firebase'

var firebaseui = require('firebaseui')

import './style/style.css'

const ui = new firebaseui.auth.AuthUI(firebase.auth())

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user.displayName)
    const rootEle = document.getElementById('base')
    rootEle.innerHTML = ''
    ReactDOM.render(<AdminComponent />, rootEle)
  } else {
    console.log('show the form!')
    ui.start('#base', {
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: true,
          signInSuccess: (user) => {
            console.log(user)
          }
        }
      ]
    });
  }
});


