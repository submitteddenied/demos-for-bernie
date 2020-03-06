import firebase from './firebase'
const db = firebase.firestore()


export default {
  getCount: () => {
    return db.doc('demos/submitteddenied').get()
      .then((doc) => {
        return {count: doc.get('demos')}
      })
  },
  incrementCount: (count) => {
    const doc = db.doc('demos/submitteddenied')
    doc.update('demos', firebase.firestore.FieldValue.increment(count))
      .then(() => {
        return doc.get()
      })
      .then((updatedDoc) => {
        return {count: updatedDoc.get('demos')}
      })
  }
}