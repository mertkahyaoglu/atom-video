'use babel'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { increment, decrement } from '../actions/counter'
import { connect } from 'react-redux'

import VideoContainer from '../containers/VideoContainer'
import Sidebar from '../containers/Sidebar'

class App extends Component {
  render() {
    return (
      <div className="atom-video">
        <Sidebar />
        <VideoContainer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { counter } = state;
  return {
    counter: counter.counter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onPlusClick: increment,
    onMinusClick: decrement
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
