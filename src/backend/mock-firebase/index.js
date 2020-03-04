class MockFirebase {
  constructor() {
    this.collections = {}
  }

  collection(name) {
    if(this.collections[name] === undefined) {
      this.collections[name] = new Collection(name)
    }
    return this.collections[name]
  }

  runTransaction(fn) {
    return new Promise((res, rej) => {
      try {
        fn(this)
        res()
      } catch (err) {
        rej(err)
      }
    })
  }

  get(docRef) {
    return new Promise((res) => res(docRef))
  }

  doc(path) {
    const [collectionName, docName] = path.split('/')
    return this.collection(collectionName).doc(docName)
  }

  update(docRef, data) {
    const newData = Object.assign({}, docRef.get(), data)
    docRef.set(newData)
  }
}

class Collection {
  constructor(name) {
    this.name = name
    this.docs = {}
  }

  doc(name) {
    if(this.docs[name] === undefined) {
      this.docs[name] = new DocRef(name)
    }
    return this.docs[name]
  }

  get() {
    return new Promise((res) => {
      res(Object.values(this.docs))
    })
  }
}

class DocRef {
  constructor(id) {
    this.id = id
    this.exists = true
  }

  set(data) {
    this.data = data
  }

  get() {
    return new Promise((res) => {
      res(new DocSnapshot(this.id, Object.assign({}, this.data)))
    })
  }

  data() {
    return this.data
  }
  
  update(fieldName, fieldValue) {
    // TODO: Make sure this fieldValue is an increment
    return new Promise((res, rej) => {
      try {
        if(this.data[fieldName] === undefined) {
          this.data[fieldName] = 0
        }
        this.data[fieldName] += fieldValue.operand
        res()
      } catch (err) {
        rej(err)
      }
    })
  }
}

class DocSnapshot {
  constructor(id, data) {
    this.id = id
    this.data = data
    this.exists = true
  }

  get(field) {
    if(field === undefined) {
      return this.data
    }
    return this.data[field]
  }

  data() {
    return this.data
  }
}

module.exports = MockFirebase