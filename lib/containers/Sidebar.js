'use babel';

import React, { Component } from 'react'

import SidebarHeader from '../components/SidebarHeader'

class Sidebar extends Component {

  render() {
    const { username } = this.props
    return (
      <div className="sidebar">
        <SidebarHeader />
        {username}
      </div>
    )
  }
}

export default Sidebar
