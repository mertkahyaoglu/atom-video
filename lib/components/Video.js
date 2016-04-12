'use babel';

import React, { Component } from 'react'

class Video extends Component {

  render() {
    //const { username } = this.props
    return (
      <div className="video">
        <video autoPlay></video>
      </div>
    )
  }

}

export default Video
