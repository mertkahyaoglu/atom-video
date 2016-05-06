'use babel';

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import _ from 'underscore-plus'

import { connectToGithub, connectRandom } from '../actions/login'
import { answerCall, exitCall} from '../actions/session'

import VideoList from '../components/VideoList'
import Start from '../components/Start'
import CallRequest from '../components/CallRequest'
import Notification from '../components/Notification'

class MainContainer extends Component {

  render() {
    const { connectRandom, connectToGithub, connectingToGithub, errorGithub, callRequest, connection, callingStatus, answerCall, exitCall, streams, callStarted } = this.props;
    return (
      <div className="main-container">

        {
          !callStarted &&
          <Start connectRandom={connectRandom} connectToGithub={connectToGithub} error={errorGithub} connectingToGithub={connectingToGithub} />
        }

        {
          callStarted &&
          (
            <div>
              <VideoList streams={streams} />
              <div className="exit-call" onClick={exitCall}>x</div>
            </div>
          )
        }

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
    callingStatus: session.callingStatus,
    callStarted: session.callStarted,
    streams: session.streams,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    connectToGithub,
    connectRandom,
    answerCall,
    exitCall
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
