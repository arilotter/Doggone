import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ActionButton } from 'react-native-material-ui';

import Camera from 'react-native-camera';

export default class Home extends Component {
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
            icon="camera"
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
      .then(data => console.log(data))
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
