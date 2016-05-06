'use babel';

import React, { Component } from 'react'
import _ from 'underscore-plus'

import Video from '../components/Video'
import SelfVideo from '../components/SelfVideo'

class VideoList extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.streams.length !== this.props.streams.length) ||
        (nextProps.selfUrl !== this.props.selfUrl);
  }

  render() {
    const { streams, selfUrl, getSelfUrl } = this.props
    let videos = _.map(streams, (stream) => {
      let url = window.URL.createObjectURL(stream.stream)
      return <Video url={url} username={stream.username} />
    })

    return (
      <div className="video-container">
        <SelfVideo getSelfUrl={getSelfUrl} selfUrl={selfUrl} />
        {videos}
      </div>
    )
  }

}

export default VideoList
