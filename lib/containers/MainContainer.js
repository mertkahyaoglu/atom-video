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
    const { connectRandom, connectToGithub, connectingToGithub, errorGithub, callRequest, connection, callingStatus, answerCall } = this.props;
    return (
      <div className="main-container">

        <Start connectRandom={connectRandom} connectToGithub={connectToGithub} error={errorGithub} connectingToGithub={connectingToGithub} />

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
  const { login, session } = state;
  return {
    user: login.user,
    connectingToGithub: login.connecting,
    errorGithub: login.error,
    connection: session.connection,
    callRequest: session.callRequest,
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
