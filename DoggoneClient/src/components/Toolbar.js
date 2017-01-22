import React, { Component } from 'react';
import { Toolbar as MaterialToolbar } from 'react-native-material-ui';

export default class Toolbar extends Component {
  _back = () => {
    this.props.navigate.pop();
  }
  render () {
    const back = 'arrow-back';
    return (
      <MaterialToolbar
        style={{ container: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0
        }}}
        leftElement={back}
        onLeftElementPress={this._back}
        centerElement={this.props.scene.route.key}
      />
    );
  }
}
