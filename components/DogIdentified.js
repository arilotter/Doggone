import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';

import DogCard from './DogCard';

class DogIdentified extends Component {
  render () {
    return (
      <View style={{ height: 192 }}>
        <ScrollView horizontal>
          <DogCard name="pepperoni" breed="corgi" />
          <DogCard name="butthead" />
          <DogCard breed="german shephard"/>
          <DogCard />
          <DogCard />
          <DogCard />
          <DogCard />
          <DogCard />
          <DogCard />
          <DogCard />
          <DogCard />
        </ScrollView>
      </View>
    );
  }
}
export default DogIdentified;
