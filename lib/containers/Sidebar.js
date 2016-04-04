'use babel';

import React, { Component } from 'react'

import SidebarHeader from '../components/SidebarHeader'

class Sidebar extends Component {

  render() {
    return (
      <div className="sidebar">
        <SidebarHeader />
      </div>
    )
  }
}

export default Sidebar
