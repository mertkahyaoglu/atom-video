'use babel';

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import _ from 'underscore-plus'

class Video extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.url !== this.props.url;
  }

  onClickMute(e) {
    let video = findDOMNode(this.refs.video)
    video.muted = !video.muted
    e.target.innerText = video.muted ? "Unmute" : "Mute"
  }

  render() {
    const { url, username } = this.props
    return (
      <div className="video">
        <video ref="video" src={url} autoPlay></video>
        <div className="controls">
          <span onClick={this.onClickMute.bind(this)} className="mute">Mute</span>
        </div>
      </div>
    )
  }

}

export default Video
