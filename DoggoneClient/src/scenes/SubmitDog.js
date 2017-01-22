import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';

class SubmitDog extends Component {
  render () {
    return (
      <ScrollView>
        <Image
          style={styles.dogPhoto}
          source={{
            uri: this.props.photo
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  dogPhoto: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3
  }
});

export default SubmitDog;
