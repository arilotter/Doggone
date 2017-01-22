import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import RNFS from 'react-native-fs';

// takes an imagePath prop
// and a next prop
class RecognizeDog extends Component {
  constructor (props) {
    super(props);
    this._recognize();
  }

  _recognize () {
    RNFS.readFile(this.props.imagePath, 'base64')
      .then(base64 => global.fetch(global.backend + '/upload', {
        method: 'POST',
        body: base64
      }))
      .then(response => response.json())
      .then(json => {
        this.props.navigate.push(this.props.next, {
          uuid: json.data_id,
          photo: this.props.imagePath,
          classification: json.classify
        });
      })
      .catch(err => console.log(err));
  }
  render () {
    return (
      <View>
        <Image
          source={{
            uri: this.props.imagePath
          }}
          style={styles.dogPhoto}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dogPhoto: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});

export default RecognizeDog;
