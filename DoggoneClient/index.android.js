import React, { Component } from 'react';
import { AppRegistry, UIManager, NavigationExperimental, View, BackAndroid } from 'react-native';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import Toolbar from './src/components/Toolbar';

import Home from './src/scenes/Home';
import BrowseDogs from './src/scenes/BrowseDogs';

const uiTheme = {
  palette: {
    primaryColor: COLOR.amber500,
    accentColor: COLOR.blueA200
  }
};

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils
} = NavigationExperimental;

function reducer (state, action, route) {
  if (!state) {
    return {
      index: 0,
      routes: [{key: 'home'}]
    };
  }
  switch (action) {
    case 'push': {
      return NavigationStateUtils.push(state, route);
    }
    case 'pop': {
      return NavigationStateUtils.pop(state);
    }
    default:
      return state;
  }
}

export default class DogGone extends Component {
  constructor (props) {
    super(props);
    this.state = {
      navState: reducer()
    };
    this._navigate = this._navigate.bind(this);
    this._renderScene = this._renderScene.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._handleBackAction = this._handleBackAction.bind(this);
  }

  _handleBackAction () {
    if (this.state.navState.index === 0) {
      return BackAndroid.exitApp();
    }
    this._navigate('pop');
    return true;
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction);
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
  }

  render () {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <NavigationCardStack
          navigationState={this.state.navState}
          renderScene={(props) => {
            return (
              <View style={styles.scene}>
                {this._renderScene(props)}
              </View>
            );
          }}
          renderHeader={this._renderHeader}
        />
      </ThemeProvider>
    );
  }

  _renderScene (props) {
    const Component = {
      'home': require('./src/scenes/Home').default,
      'browse': require('./src/scenes/BrowseDogs').default,
      'camera': require('./src/scenes/DogCamera').default,
      'recognized': require('./src/scenes/LostDogRecognized').default,
      'detail': require('./src/scenes/DogDetails').default
    }[props.scene.route.key];
    return <Component navigate={this._navigate} {...this.state.componentProps} />;
  }

  _renderHeader (sceneProps) {
    return (
      <Toolbar
        navigate={this._navigate}
        {...sceneProps}
      />
    );
  }

  _navigate (action, route, componentProps) {
    const navState = reducer(this.state.navState, action, route);
    this.setState({ navState, componentProps });
  }
}

AppRegistry.registerComponent('DogGone', () => DogGone);

const styles = {
  scene: {
    flex: 1,
    marginTop: 56
  }
};
