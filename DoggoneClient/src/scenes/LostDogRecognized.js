import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Dimensions } from 'react-native';

import DogCard from '../components/DogCard';

class SceneLostDogRecognized extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dogCards: [],
      dogType: ''
    };
    this._fetch();
  }

  _fetch () {
    global.fetch(global.backend + '/find/lost/39.953/-75.193/2000000/Terrier/Terrier')
      .then(response => response.json())
      .then(json => {
        const dogCards = json.dogs.map(dog => (
          <DogCard
            key={dog.uuid}
            dog={dog}
            onPress={() => this.props.navigate.push('detail', { dog })}
          />
        ));
        this.setState({ dogCards });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render () {
    console.log(this.props.classification);
    const breeds = this.props.classification.sort((a, b) => b.confidence - a.confidence);
    return (
      <ScrollView>
        <Image
          style={styles.dogPhoto}
          source={{
            uri: this.props.photo
          }}
        />
        <Text style={styles.infoText}>This dog looks like a</Text>
        <Text style={styles.infoBreed}> {breeds[0].dog_type}</Text>
        <View style={styles.dogsContainer}>
          {this.state.dogCards}
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
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  }
});

export default SceneLostDogRecognized;
