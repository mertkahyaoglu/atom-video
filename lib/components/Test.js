'use babel';

import React, { Component, PropTypes } from 'react';

class Test extends Component {

  handleBtnClick() {
    const { increment } = this.props;
    increment()
  }

  render() {
    const {counter} = this.props;
    console.log(this.props)
    return (
      <div>
        State: {counter}
        <a onClick={this.handleBtnClick}> Increment </a>
      </div>
    )
  }
}

export default Test
