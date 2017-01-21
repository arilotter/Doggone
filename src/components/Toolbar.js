import React, { Component } from 'react';
import { Toolbar as MaterialToolbar } from 'react-native-material-ui';

export default class Toolbar extends Component {
  render () {
    const routes = this.props.navigator.getCurrentRoutes();
    const title = routes[routes.length - 1].title;

    return (
      <MaterialToolbar
        style={{ container: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0
        }}}
        centerElement={title}
      />
    );
  }
}
