'use babel';

import React, { Component } from 'react'

class Test extends Component {

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
