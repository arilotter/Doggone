import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-material-ui';
import ImagePicker from 'react-native-image-crop-picker';

export default class SceneHome extends Component {
  render () {
    const pickerOptions = {
      width: 640,
      height: 480,
      cropping: true,
      compressImageQuality: 0.6
    };
    return (
      <View>
        <Button
          raised accent
          text='I found a dog!'
          icon='photo-camera'
          style={{ container: styles.mainButton }}
          onPress={() => {
            ImagePicker.openCamera(pickerOptions)
            .then(image => {
              this.props.navigate.push('recognize', {
                imagePath: image.path,
                next: 'submit'
              });
            });
          }}
        />
        <Button
          raised accent
          text='I lost my dog!'
          icon='insert-photo'
          style={{ container: styles.mainButton }}
          onPress={() => {
            ImagePicker.openPicker(pickerOptions)
            .then(image => {
              this.props.navigate.push('recognize', {
                imagePath: image.path,
                next: 'submit'
              });
            });
          }}
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
