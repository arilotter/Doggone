import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import RNFS from 'react-native-fs';

// takes an imagePath prop
// and a next prop
class RecognizeDog extends Component {
  constructor (props) {
    super(props);
    this._recognize();
    this.state = {
      animatedStartValue: new Animated.Value(0)
    };
    this.cycleAnimation = this.cycleAnimation.bind(this);
  }

  componentDidMount () {
    this.cycleAnimation();
  }

  cycleAnimation () {
    Animated.sequence([
      Animated.timing(this.state.animatedStartValue, {
        toValue: Dimensions.get('window').height,
        duration: 500
      }),
      Animated.timing(this.state.animatedStartValue, {
        toValue: 0,
        duration: 500
      })
    ]).start(event => {
      if (event.finished) {
        this.cycleAnimation();
      }
    });
  }

  _recognize () {
    RNFS.readFile(this.props.imagePath, 'base64')
      .then(base64 => global.fetch(global.backend + '/upload', {
        method: 'POST',
        body: base64
      }))
      .then(response => response.json())
      .then(json => {
        this.props.navigate.pop(); // remove self from stack
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
        <Animated.View
          style={{
            width: Dimensions.get('window').width,
            height: 0,
            backgroundColor: 'red',
            position: 'absolute',
            top: this.state.animatedStartValue,
            left: 0,
            right: 0
          }}
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