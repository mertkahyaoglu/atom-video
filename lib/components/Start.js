'use babel';

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

class Start extends Component {

  handleBtnGithubClick(event) {
    let input_token = findDOMNode(this.refs.input_token)
    input_token.style.display = "block"
  }

  handleChange(e) {
    if (e.key == 'Enter') {
      console.log(e.target.value)
    }
  }

  render() {
    return (
      <div className="starting">
        <h1 className="title"> Atom Video 🎥</h1>
        <h2>Call your friends while coding</h2>
        <a onClick={this.handleBtnGithubClick.bind(this)} ref="button_github" className="btn">Use GitHub username</a> or <a className="btn">Be Random</a>
        
        <input onKeyPress={this.handleChange} ref="input_token" className="input-token native-key-bindings" placeholder="Github Token"/>
      </div>
    )
  }

}

export default Start
