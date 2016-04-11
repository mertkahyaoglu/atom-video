'use babel';

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { connectToGithub, connectRandom } from '../actions/login'

import Video from '../components/Video'
import Start from '../components/Start'
import CallRequest from '../components/CallRequest'

class MainContainer extends Component {

  render() {
    const { connectRandom, connectToGithub, errorGithub, callRequest, caller } = this.props;
    return (
      <div className="main-container">

        <Start onRandomClick={connectRandom} onGithubClick={connectToGithub} error={errorGithub} />

        <div className="video-container"></div>

        {
          callRequest && <CallRequest caller={caller} onAcceptClick={console.log("yes")} onDeclineClick={console.log("no")} />
        }
      </div>
    )
  }

}

function mapStateToProps(state) {
  const { github, session } = state;
  return {
    errorGithub: github.errorGithub,
    callRequest: session.callRequest,
    caller: session.caller,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    connectToGithub,
    connectRandom
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
