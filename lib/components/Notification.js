'use babel'

import React, { Component } from 'react'

class Notification extends Component {
  render() {
    let type = this.props.type
    let text
    switch (type) {
      case 1:
        text = "Call accepted."
        break;
      case 2:
        text = "Call declined."
        break;
      case 3:
        text = "Exited."
        break;
      default:
    }
    return <div className={"call-status type"+type}>{text}</div>
  }
}

export default Notification
