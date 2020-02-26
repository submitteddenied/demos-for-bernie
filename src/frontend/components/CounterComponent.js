import React, {Component} from 'react'

const POLL_INTERVAL_MS = 1000

class CounterComponent extends Component {
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
    window.fetch('/api/count')
      .then((response) => {
        if(response.ok) {
          return response.json()
        } else {
          window.fetch('/api/error?' + window.encodeURIComponent(response.body))
          return this.state
        }
      })
      .then((data) => {
        this.setState({count: data.count})
      })
      .finally(() => {
        this.timeout = window.setTimeout(() => this.fetch(), POLL_INTERVAL_MS)
      })

  }

  render() {
    const styleObj = {
      color: 'white'
    }
    return (
      <h1 style={styleObj}>{this.state.count}</h1>
    )
  }
}

export default CounterComponent
