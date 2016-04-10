'use babel';

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { createSession, connectToPeer } from '../actions/session'

import SidebarHeader from '../components/SidebarHeader'

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
        <div className="sidebar-body">
          <h3 className="username">{username}</h3>
          <img className="avatar" src={(avatar) ? avatar : 'atom://atom-video/assets/user.png'} />
        </div>
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
