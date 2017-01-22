import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import DogPicker from '../components/DogPicker';

class SceneBrowseDogs extends Component {
  render () {
    return (
      <View>
        <DogPicker />
      </View>
    );
  }
}

export default SceneBrowseDogs;
