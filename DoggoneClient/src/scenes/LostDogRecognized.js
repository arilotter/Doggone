import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Dimensions } from 'react-native';

import DogCard from '../components/DogCard';

class SceneLostDogRecognized extends Component {
  constructor (props) {
    super(props);
    this.openDogDetails = this.openDogDetails.bind(this);
  }

  openDogDetails (dog) {
    console.log(dog);
  }

  render () {
    const dogs = [{
      key: 'asdasfasdf',
      breed: 'Bulldog',
      photo: 'http://i.imgur.com/A79quK6.png'
    }, {
      key: 'asdflkjg4',
      breed: 'Corgi',
      photo: 'http://i.imgur.com/A79quK6.png'
    }, {
      key: 'dfklgj90',
      name: 'Borkley',
      breed: 'Chihuahua',
      photo: 'http://i.imgur.com/A79quK6.png'
    }
    ];

    const dogCards = dogs.map(dog => (
      <DogCard
        key={dog.key}
        dog={dog}
        onPress={this.openDogDetails}
      />
    ));
    console.log(this.props);
    return (
      <View>
        <Image
          style={styles.dogPhoto}
          source={{
            uri: this.props.photo
          }}
        />
        <Text style={styles.infoText}>This dog looks like a</Text>
        <Text style={styles.infoBreed}> {this.props.breed}</Text>
        <View style={{ height: 192 }}>
          <ScrollView horizontal>
            {dogCards}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dogPhoto: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3
  },
  infoText: {
    padding: 8,
    paddingBottom: 0,
    fontSize: 32
  },
  infoBreed: {
    fontSize: 48,
    padding: 8,
    paddingTop: 0,
    color: 'black'
  }
});

SceneLostDogRecognized.propTypes = {
  breed: React.PropTypes.string.isRequired,
  photo: React.PropTypes.string.isRequired
};

export default SceneLostDogRecognized;
