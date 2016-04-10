'use babel';

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { createSession, connectToPeer } from '../actions/session'

import SidebarHeader from '../components/SidebarHeader'
import SidebarBody from '../components/SidebarBody'

class Sidebar extends Component {

  componentWillMount() {
    const { username, createSession } = this.props
    createSession(username)
  }

  render() {
    const { username, avatar, connectToPeer } = this.props
    return (
      <div className="sidebar">
        <SidebarHeader connectToPeer={connectToPeer} />
        <SidebarBody username={username} avatar={avatar} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { github } = state;
  return {
    username: github.username,
    avatar: github.avatar
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createSession,
    connectToPeer
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
