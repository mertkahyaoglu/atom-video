'use babel';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { increment, decrement } from '../actions/counter';
import { connect } from 'react-redux';
import Test from '../components/Test';

class App extends Component {
  render() {
    return <Test {...this.props} />
  }
}

function mapStateToProps(state) {
  const { counter } = state;
  return {
    counter: counter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(increment, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
