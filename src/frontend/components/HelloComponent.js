import React, {Component} from 'react'

class HelloComponent extends Component {
  constructor() {
    super()
  }

  render() {
    const styleObj = {
      color: 'white'
    }
    return (
      <h1 style={styleObj}>Hello World</h1>
    )
  }
}

export default HelloComponent
