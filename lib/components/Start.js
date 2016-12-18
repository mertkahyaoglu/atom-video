'use babel';

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

class Start extends Component {

  handleBtnGithubClick(event) {
    let input_token = findDOMNode(this.refs.input_token)
    input_token.style.display = "block"
  }

  handleChange(e) {
    const { connectToGithub } = this.props
    if (e.key == 'Enter') {
      connectToGithub(e.target.value)
    }
  }

  render() {
    const { error, connectingToGithub, connectRandom } = this.props
    let token = atom.config.get('atom-video.token')
    return (
      <div className="starting">
        <h1 className="title"> Atom Video 🎥</h1>
        <p className="slogan">Call your friends while coding</p>
        {
          !connectingToGithub &&
          <div>
            <a onClick={this.handleBtnGithubClick.bind(this)} ref="button_github" className="btn">Use GitHub username</a> or <a onClick={connectRandom} className="btn">Be Random</a>

            <input onKeyPress={this.handleChange.bind(this)} ref="input_token" className={'input-token native-key-bindings ' + (error ? 'error visible' : '')} placeholder="Github Token" defaultValue={token}/>
          </div>
        }
        {
          connectingToGithub &&
          <img className="loading" src='atom://atom-video/assets/loading.gif' />
        }
      </div>
    )
  }

}

export default Start
