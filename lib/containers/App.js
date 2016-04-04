'use babel'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { increment, decrement } from '../actions/counter'
import { connect } from 'react-redux'
import Test from '../components/Test'

class App extends Component {
  render() {
    return (
      <div className="atom-video">
        <Test {...this.props} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { counter } = state;
  console.log(counter)
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
