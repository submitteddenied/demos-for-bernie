import React, {Component} from 'react'

import background_url from '../assets/counter-background.png'

import db from '../services/database'

const POLL_INTERVAL_MS = 1000

class AdminComponent extends Component {
  constructor() {
    super()
    this.state = {
      count: '...',
      state: 'starting'
    }
  }

  componentWillMount() {
    this.fetch()
  }

  fetch() {
    db.getCount()
      .then((data) => {
        if(data.count === undefined) {
          data.count = 0
        }
        this.setState({count: data.count})
      })
      .finally(() => {
        this.timeout = window.setTimeout(() => this.fetch(), POLL_INTERVAL_MS)
      })

  }

  increment(e, count) {
    e.preventDefault()
    db.incrementCount(count)

    return false
  }

  render() {
    const containerStyle = {
      background: '#222222'
    }
    return (
      <div className="admin">
        <h1>Admin</h1>
        <div onClick={(e) => this.increment(e, 1)}>
          <div className="btn btn-primary">Demo!</div>
          <h1>{this.state.count}</h1>
        </div>
        <div className="btn btn-danger" onClick={(e) => this.increment(e, -1)}>Decrement</div>
      </div>
    )
  }
}

export default AdminComponent
