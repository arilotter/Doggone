import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ActionButton } from 'react-native-material-ui';
import RNFS from 'react-native-fs';

import Camera from 'react-native-camera';

export default class DogCamera extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.viewfinder}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.temp}
        >
          <ActionButton
            onPress={this.takePicture.bind(this)}
            icon='camera'
            style={{
              shutter: styles.shutter
            }}
          />
        </Camera>
      </View>
    );
  }

  takePicture () {
    this.camera.capture()
      .then(photo => {
        this.photo = photo;
        console.log(photo);
        return RNFS.readFile(photo.path, 'base64');
      })
      .then(base64 => global.fetch(global.backend + '/upload', {
        method: 'POST',
        body: base64
      }))
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.props.navigate.push('recognized', {
          uuid: json.data_id,
          photo: this.photo.path,
          classification: json.classify
        });
      })
      .catch(err => console.log(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewfinder: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    flex: 1,
    justifyContent: 'center'
  },
  shutter: {
  }
});
