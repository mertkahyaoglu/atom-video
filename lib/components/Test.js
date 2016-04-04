'use babel';

import React, { Component, PropTypes } from 'react'
import {increment} from '../actions/counter'

class Test extends Component {

  propTypes = {
    counter: PropTypes.number.isRequired,
    onPlusClick: PropTypes.bool.isRequired,
    onMinusClick: PropTypes.bool.isRequired
  }

  render() {
    const {counter, onPlusClick, onMinusClick} = this.props
    return (
      <div className="bg-red">
        State: {counter}
        <a onClick={onPlusClick}> Increment </a>
        <a onClick={onMinusClick}> Decrement </a>
      </div>
    )
  }
}


export default Test
