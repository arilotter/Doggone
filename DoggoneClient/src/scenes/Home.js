import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-material-ui';

export default class SceneHome extends Component {
  render () {
    return (
      <View>
        <Button
          raised accent
          text='I found a dog!'
          icon='photo-camera'
          style={{ container: styles.mainButton }}
          onPress={() => {
            this.props.navigate.push('camera');
          }}
        />
        <Button
          raised accent
          text='I lost my dog!'
          icon='insert-photo'
          style={{ container: styles.mainButton }}
        />
        <Button
          text='Browse lost dogs'
          icon='search'
          onPress={() => {
            this.props.navigate.push('browse');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainButton: {
    height: 128,
    marginBottom: 16
  }
});
