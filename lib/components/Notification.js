'use babel'

import React, { Component } from 'react'

class Notification extends Component {
  render() {
    let notification = this.props.notification
    return <div className={"call-status type"+notification.id}>{notification.text}</div>
  }
}

export default Notification
