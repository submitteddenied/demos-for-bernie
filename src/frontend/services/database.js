import firebase from './firebase'
const db = firebase.firestore()

const getDisplayName = () => {
  const user = firebase.auth().currentUser
  if(user) {
    return user.displayName
  }

  return window.location.search.slice(1)
}

export default {
  getCount: () => {
    return db.doc('demos/' + getDisplayName()).get()
      .then((doc) => {
        return {count: doc.get('demos')}
      })
  },
  incrementCount: (count) => {
    const user = firebase.auth().currentUser
    const doc = db.doc('demos/' + getDisplayName())
    doc.update('demos', firebase.firestore.FieldValue.increment(count))
      .then(() => {
        return doc.get()
      })
      .then((updatedDoc) => {
        return {count: updatedDoc.get('demos')}
      })
  }
}