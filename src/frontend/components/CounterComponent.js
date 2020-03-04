import React, {Component} from 'react'

import background_url from '../assets/counter-background.png'

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
        if(data.count === undefined) {
          data.count = 0
        }
        this.setState({count: data.count})
      })
      .finally(() => {
        this.timeout = window.setTimeout(() => this.fetch(), POLL_INTERVAL_MS)
      })

  }

  render() {
    const containerStyle = {
      backgroundImage: "url(" + background_url + ")"
    }
    const labelStyle = {
      color: 'white'
    }
    return (
      <div className="counter">
        <h1 style={labelStyle}>{this.state.count}</h1>
      </div>
    )
  }
}

export default CounterComponent
