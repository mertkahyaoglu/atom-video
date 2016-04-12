'use babel';

import React, { Component } from 'react'

class CallRequest extends Component {

  handleAcceptClick() {
    const { answerCall, connection } = this.props
    answerCall({connection:connection, answer:1})
  }

  handleDeclineClick() {
    const { answerCall, connection } = this.props
    answerCall({connection:connection, answer:2})
  }

  render() {
    const { avatar, answerCall, connection } = this.props
    let caller = connection.peer
    return (
      <div className="call-request">
        <h3>{caller} is calling..</h3>
        <img src={(avatar) ? avatar : 'atom://atom-video/assets/user.png'} />
        <div className="call-buttons">
          <a className="btn btn-success" onClick={this.handleAcceptClick.bind(this)}>Accept</a>
          <a className="btn btn-error" onClick={this.handleDeclineClick.bind(this)}>Decline</a>
        </div>
      </div>
    )
  }

}

export default CallRequest
