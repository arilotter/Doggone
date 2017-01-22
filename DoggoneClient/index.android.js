import React, { Component } from 'react';
import { AppRegistry, UIManager, NavigationExperimental, View, BackAndroid } from 'react-native';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import Toolbar from './src/components/Toolbar';

global.backend = 'http://104.236.201.25'; // not all globals are evil!

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

export default class DogGone extends Component {
  constructor (props) {
    super(props);
    this.state = {
      navState: {
        index: 0,
        routes: [{key: 'home'}]
      }
    };
    this._renderScene = this._renderScene.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._handleBackAction = this._handleBackAction.bind(this);
    const thos = this;
    this._navigate = {
      push: (key, passProps) => {
        thos.setState({
          navState: NavigationStateUtils.push(thos.state.navState, {key, passProps})
        });
      },
      pop: () => thos.setState({navState: NavigationStateUtils.pop(thos.state.navState)})
    };
  }

  _handleBackAction () {
    if (this.state.navState.index === 0) {
      return BackAndroid.exitApp();
    }
    this._navigate.pop();
    return true;
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        global.lat = position.latitude;
        global.lon = position.longitude;
        console.log('GOT LOCATION');
      },
      (error) => console.log(JSON.stringify(error)),
      {timeout: 20000, maximumAge: 1000}
    );
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
    const Scene = {
      'home': require('./src/scenes/Home').default,
      'browse': require('./src/scenes/BrowseDogs').default,
      'camera': require('./src/scenes/DogCamera').default,
      'recognize': require('./src/scenes/RecognizeDog').default,
      'recognized': require('./src/scenes/LostDogRecognized').default,
      'detail': require('./src/scenes/DogDetails').default,
      'submit': require('./src/scenes/SubmitDog').default
    }[props.scene.route.key];
    return <Scene navigate={this._navigate} {...props.scene.route.passProps} />;
  }

  _renderHeader (sceneProps) {
    return (
      <Toolbar
        navigate={this._navigate}
        {...sceneProps}
      />
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
