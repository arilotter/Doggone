import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-material-ui';

export default class SceneHome extends Component {
  render () {
    return (
      <View>
        <Button
          raised primary
          text='I found a dog!'
          icon='photo-camera'
          onPress={() => {
            this.props.navigator.to('camera', {
              nextScene: 'recognized'
            });
          }}
        />
        <Button
          raised accent
          text='I lost my dog!'
          icon='insert-photo'
        />
        <Button
          text='Browse lost dogs'
          icon=''
        />
      </View>
    );
  }
}
