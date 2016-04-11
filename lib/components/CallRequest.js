'use babel';

import React, { Component } from 'react'

class CallRequest extends Component {

  render() {
    const { caller, onAcceptClick, onDeclineClick, avatar } = this.props
    return (
      <div className="call-request">
        <h3>{caller} is calling..</h3>
        <img src={(avatar) ? avatar : 'atom://atom-video/assets/user.png'} />
        <div className="call-buttons">
          <a className="btn btn-success" onClick={onAcceptClick}>Accept</a>
          <a className="btn btn-error" onClick={onDeclineClick}>Decline</a>
        </div>
      </div>
    )
  }

}

export default CallRequest
