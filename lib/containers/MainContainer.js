'use babel';

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { connectToGithub, connectRandom } from '../actions/login'

import Video from '../components/Video'
import Start from '../components/Start'

class MainContainer extends Component {

  render() {
    const { connectRandom, connectToGithub, errorGithub } = this.props;
    return (
      <div className="main-container">

        <Start onRandomClick={connectRandom} onGithubClick={connectToGithub} error={errorGithub} />

        <div className="video-container"></div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  const { github } = state;
  return {
    errorGithub: github.errorGithub
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    connectToGithub,
    connectRandom
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
