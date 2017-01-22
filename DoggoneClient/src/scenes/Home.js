import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
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
      <View style={styles.container}>
        <Image
          source={require('./img/dog.png')}
          style={styles.splash}
        />
        <Button
          raised accent
          text='I found a dog'
          icon='photo-camera'
          style={{ container: styles.mainButton, text: styles.buttonText }}
          onPress={() => {
            ImagePicker.openCamera(pickerOptions)
            .then(image => {
              this.props.navigate.push('recognize', {
                imagePath: image.path,
                next: 'recognized'
              });
            })
            .catch(err => console.log(err));
          }}
        />
        <Button
          raised accent
          text='I lost my dog'
          icon='insert-photo'
          style={{ container: styles.mainButton, text: styles.buttonText }}
          onPress={() => {
            ImagePicker.openPicker(pickerOptions)
            .then(image => {
              this.props.navigate.push('recognize', {
                imagePath: image.path,
                next: 'submit'
              });
            })
            .catch(err => console.log(err));
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    width: 72
  },
  mainButton: {
    height: 128,
    marginBottom: 16,
    backgroundColor: '#8D6E63'
  },
  splash: {
    width: Dimensions.get('window').width - 64,
    height: Dimensions.get('window').width - 64
  }
});
