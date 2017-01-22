import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Dimensions } from 'react-native';

import DogCard from '../components/DogCard';

class SceneLostDogRecognized extends Component {
  constructor (props) {
    super(props);
    this.openDogDetails = this.openDogDetails.bind(this);
  }

  openDogDetails (dog) {
    this.props.navigate('push', {key: 'detail'}, {
      dog: dog
    });
  }

  render () {
    const dogs = [{
      uuid: 'asdasfasdf',
      usr_type: 'American Staffordshire Terrier',
      name: 'Buttman',
      photo: 'http://i.imgur.com/A79quK6.png'
    }, {
      uuid: 'asdflkjg4',
      usr_type: 'Corgi',
      photo: 'http://i.imgur.com/A79quK6.png'
    }, {
      uuid: 'dfklgj90',
      name: 'Borkley',
      usr_type: 'Chihuahua',
      photo: 'http://i.imgur.com/A79quK6.png'
    }]; // TODO IMLPEMENT API HERE

    const dogCards = dogs.map(dog => (
      <DogCard
        key={dog.uuid}
        dog={dog}
        onPress={this.openDogDetails}
      />
    ));
    return (
      <ScrollView>
        <Image
          style={styles.dogPhoto}
          source={{
            uri: this.props.photo
          }}
        />
        <Text style={styles.infoText}>This dog looks like a</Text>
        <Text style={styles.infoBreed}> {this.props.breed}</Text>
        <View style={styles.dogsContainer}>
          {dogCards}
        </View>
      </ScrollView>
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
  },
  dogsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

SceneLostDogRecognized.propTypes = {
  photo: React.PropTypes.string.isRequired
};

export default SceneLostDogRecognized;
