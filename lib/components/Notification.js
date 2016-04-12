'use babel'

import React, { Component } from 'react'

class Notification extends Component {
  render() {
    let type = this.props.type
    let text
    switch (type) {
      case 1:
        text = "Call Accepted"
        break;
      case 2:
        text = "Call Declined"
        break;
      case 3:
        text = "Could not connect to the peer!"
        break;
      default:
    }
    return <div className={"call-status type"+type}>{text}</div>
  }
}

export default Notification
