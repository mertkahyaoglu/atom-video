'use babel';

import React, { Component } from 'react'

class SidebarHeader extends Component {

  handleChange(e) {
    const { connectToPeer } = this.props
    if (e.key == 'Enter') {
      connectToPeer(e.target.value)
      e.target.value = ""
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
