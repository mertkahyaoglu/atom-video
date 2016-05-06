'use babel';

import React, { Component } from 'react'
import _ from 'underscore-plus'

import Video from '../components/Video'

class VideoList extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.streams.length !== this.props.streams.length;
  }

  render() {
    const { streams } = this.props
    let videos = _.map(streams, (stream) => {
      let url = window.URL.createObjectURL(stream.stream)
      return <Video url={url} username={stream.username} />
    })
    return (
      <div className="video-container">
        {videos}
      </div>
    )
  }

}

export default VideoList
