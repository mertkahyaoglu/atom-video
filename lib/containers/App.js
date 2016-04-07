'use babel'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MainContainer from '../containers/MainContainer'
import Sidebar from '../containers/Sidebar'

import { connectToGithub } from '../actions/github'

class App extends Component {

  componentWillMount() {
    const { connectToGithub } = this.props
    if (atom.config.get('atom-video.token')) {
      connectToGithub(atom.config.get('atom-video.token'))
    }
  }

  render() {
    const { username } = this.props
    return (
      <div className="atom-video">
        {
          username && <Sidebar username={username} />
        }
        <MainContainer {...this.props} />
      </div>
    )
  }

}

function mapStateToProps(state) {
  const { github } = state;
  return {
    username: github.username,
    error: github.error
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    connectToGithub: connectToGithub
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
