import React, { Component } from 'react';
import { Toolbar as MaterialToolbar } from 'react-native-material-ui';

export default class Toolbar extends Component {
  getTitle (key) {
    return {
      'home': 'Home',
      'browse': 'this string will never be seen',
      'camera': 'Take a picture of a dog you found',
      'recognize': 'Recognizing the dog\'s breed',
      'recognized': 'Dog has been identified',
      'detail': 'Dog details',
      'thanks': 'Thanks for submitting',
      'submit': 'Submit a lost dog'
    }[key];
  }
  render () {
    const back = this.props.scene.route.key === 'home' ? '' : 'arrow-back';
    return (
      <MaterialToolbar
        style={{ container: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0
        }}}
        leftElement={back}
        onLeftElementPress={() => this.props.navigate.pop()}
        centerElement={this.getTitle(this.props.scene.route.key)}
      />
    );
  }
}
