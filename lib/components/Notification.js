'use babel'

import React, { Component } from 'react'

class Notification extends Component {
  render() {
    const { id, text } = this.props.notification
    return <div className={"call-status type"+id}>{text}</div>
  }
}

export default Notification
