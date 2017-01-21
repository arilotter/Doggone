import React, { Component } from 'react';
import { AppRegistry, UIManager, Navigator, View } from 'react-native';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import Navigate from './src/Navigate';
import Toolbar from './src/components/Toolbar';

const uiTheme = {
  palette: {
    primaryColor: COLOR.amber500,
    accentColor: COLOR.blueA200
  }
};

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class DogGone extends Component {
  constructor (props) {
    super(props);
    this.state = {
      nav: null,
      title: ''
    };
    this.setNavigator = this.setNavigator.bind(this);
  }
  setNavigator (navigator) {
    this.setState({
      nav: new Navigate(navigator)
    });
  }
  render () {
    return (
      <ThemeProvider
        uiTheme={uiTheme}
      >
        <Navigator
          initialRoute={Navigate.getInitialRoute()}
          navigationBar={<Toolbar />}
          ref={navigator => { !this.state.nav ? this.setNavigator(navigator) : null; }}
          renderScene={(route) => {
            if (this.state.nav && route.component) {
              return (
                <View style={styles.scene}>
                  <route.component navigator={this.state.nav} title={route.title} path={route.path} {...route.props} />
                </View>
              );
            }
          }}
        />
      </ThemeProvider>
    );
  }
}

AppRegistry.registerComponent('DogGone', () => DogGone);

const styles = {
  scene: {
    flex: 1,
    marginTop: 56
  }
};
