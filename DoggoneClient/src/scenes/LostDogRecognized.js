import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Dimensions } from 'react-native';

import DogCard from '../components/DogCard';
import DogPicker from '../components/DogPicker';

class SceneLostDogRecognized extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dogCards: [],
      breed: ''
    };
    this._fetch = this._fetch.bind(this);
  }

  _fetch (breed) {
    const guessedType = this.props.classification.reduce((a, b) => a.confidence > b.confidence ? a : b).dog_type;
    if (breed) {
      this.setState({breed});
    } else {
      this.setState({ breed: guessedType });
    }
    global.fetch(global.backend + `/find/lost/${global.lat}/${global.lon}/2000000/${this.state.breed || guessedType}/${guessedType}`)
      .then(response => response.json())
      .then(json => {
        const dogCards = json.dogs.map(dog => (
          <DogCard
            key={dog.uuid}
            dog={dog}
            onPress={() => this.props.navigate.push('detail', { dog })}
          />
        ));
        console.log(dogCards);
        if (dogCards.length > 0) {
          this.setState({ dogCards });
        } else {
          this.setState({ dogCards:<Text key={"empty"}>
            No dogs of this breed have been reported missing.
          </Text> });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount () {
    this._fetch();
  }
  render () {
    return (
      <ScrollView>
        <Image
          style={styles.dogPhoto}
          source={{
            uri: this.props.photo
          }}
        />
        <Text style={styles.infoText}>This dog looks like a</Text>
        <DogPicker
          value={this.state.breed}
          onValueChange={this._fetch}
          hideUnclassified
          classification={this.props.classification}
          />
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
