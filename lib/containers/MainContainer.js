'use babel';

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

import Video from '../components/Video'
import Start from '../components/Start'

class MainContainer extends Component {

  render() {
    let tokenExists = atom.config.get('atom-video.token')
    return (
      <div className="main-container">

        { !tokenExists && <Start /> }

        <div className="video-container"></div>
      </div>
    )
  }

}

export default MainContainer
