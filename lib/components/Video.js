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
    e.target.style.backgroundImage = video.muted ? "url('atom://atom-video/assets/mic-on.png')" : "url('atom://atom-video/assets/mic-off.png')"
  }

  render() {
    const { url, username } = this.props
    return (
      <div className="video">
        <video ref="video" poster="atom://atom-video/assets/user.png" src={url} autoPlay></video>
        <div className="controls">
          <span onClick={this.onClickMute.bind(this)} className="mute"></span>
        </div>
      </div>
    )
  }

}

export default Video
