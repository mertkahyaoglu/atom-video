'use babel';

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Video from '../components/Video'
import Start from '../components/Start'

class MainContainer extends Component {

  render() {
    const { connectToGithub, username, error } = this.props
    let tokenExists = atom.config.get('atom-video.token')
    return (
      <div className="main-container">

        { (!tokenExists || error) && <Start {...this.props} /> }

        <div className="video-container"></div>
      </div>
    )
  }

}

export default MainContainer
