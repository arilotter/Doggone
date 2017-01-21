import React, { Component } from 'react';
import { AppRegistry, UIManager } from 'react-native';
import { COLOR, ThemeProvider } from 'react-native-material-ui';

import DogIdentified from './components/DogIdentified';

const uiTheme = {
  palette: {
    primaryColor: COLOR.amber500,
    accentColor: COLOR.blueA200
  }
};

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class DogGone extends Component {
  render () {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <DogIdentified />
      </ThemeProvider>
    );
  }
}

AppRegistry.registerComponent('DogGone', () => DogGone);
