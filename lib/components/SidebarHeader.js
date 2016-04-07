'use babel';

import React, { Component } from 'react'

class SidebarHeader extends Component {

  render() {
    return (
      <div className="sidebar-header">
        <input className="input-call native-key-bindings" placeholder="Call a friend" ref="input_call" />
      </div>
    )
  }

}

export default SidebarHeader
