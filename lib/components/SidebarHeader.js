'use babel';

import React, { Component } from 'react'

class SidebarHeader extends Component {

  handleChange(e) {
    const { user, connectToPeer } = this.props
    let input = e.target.value
    if (input == user.username) {
      e.target.value = ""
      return false;
    }
    if (e.key == 'Enter' && input != "") {
      e.target.value = ""
      connectToPeer(input)
    }
  }

  render() {
    const { calling, callTarget } = this.props
    return (
      <div className="sidebar-header">
        {
          calling && <div className="calling">Calling {callTarget} ..</div>
        }
        {
          !calling && <input onKeyPress={this.handleChange.bind(this)} className="input-call native-key-bindings" placeholder="Call a friend" ref="input_call" />
        }
      </div>
    )
  }

}

export default SidebarHeader
