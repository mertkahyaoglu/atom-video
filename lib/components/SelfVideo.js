'use babel';

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import _ from 'underscore-plus'

class SelfVideo extends Component {

  componentDidMount() {
    const { getSelfUrl, selfUrl } = this.props
    getSelfUrl()
  }

  render() {
    return (
      <div className="video">
        <video poster="atom://atom-video/assets/user.png" src={this.props.selfUrl} autoPlay></video>
      </div>
    )
  }

}

export default SelfVideo
