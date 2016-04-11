'use babel';

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

let tooltip

class SidebarBody extends Component {

  componentDidMount() {
    tooltip = atom.tooltips.add(findDOMNode(this.refs.username), {
      title: 'Click to copy',
      trigger: 'hover',
      delay: { show: 50 }
    })
  }

  componentWillUnmount() {
    tooltip.dispose()
  }

  onUsernameClick(event) {
    atom.clipboard.write(event.target.innerText)
  }

  render() {
    const { username, avatar } = this.props
    return (
      <div className="sidebar-body">
        <h3 ref="username" onClick={this.onUsernameClick}>{username}</h3>
        <img src={(avatar) ? avatar : 'atom://atom-video/assets/user.png'} />
      </div>
    )
  }

}

export default SidebarBody
