'use babel';

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import _ from 'underscore-plus'

class SelfVideo extends Component {

  componentDidMount() {
    const { getSelfUrl, selfUrl } = this.props
    console.log(selfUrl)
    getSelfUrl()
  }

  render() {
    const { selfUrl } = this.props
    return (
      <div className="video">
        <video poster="atom://atom-video/assets/user.png" src={selfUrl} autoPlay></video>
      </div>
    )
  }

}

export default SelfVideo
