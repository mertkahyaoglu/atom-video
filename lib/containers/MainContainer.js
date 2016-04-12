'use babel';

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { connectToGithub, connectRandom } from '../actions/login'
import { answerCall } from '../actions/session'

import Video from '../components/Video'
import Start from '../components/Start'
import CallRequest from '../components/CallRequest'
import Notification from '../components/Notification'

class MainContainer extends Component {

  render() {
    const { connectRandom, connectToGithub, errorGithub, callRequest, connection, callingStatus, answerCall } = this.props;
    return (
      <div className="main-container">

        <Start onRandomClick={connectRandom} onGithubClick={connectToGithub} error={errorGithub} />

        <div className="video-container"></div>

        {
          callRequest && <CallRequest connection={connection} answerCall={answerCall} />
        }

        {
          callingStatus != 0 && <Notification type={callingStatus} />
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
    connection: session.connection,
    callingStatus: session.callingStatus
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    connectToGithub,
    connectRandom,
    answerCall
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
