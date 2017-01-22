import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Dimensions } from 'react-native';

import DogCard from '../components/DogCard';

class SceneLostDogRecognized extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dogCards: []
    }
    this.openDogDetails = this.openDogDetails.bind(this);
    this._fetch();
  }

  openDogDetails (dog) {
    this.props.navigate.push('detail', {
      dog
    });
  }

  _fetch () {
    fetch('http://104.236.201.25/find/lost/39.953/-75.193/2000000/Terrier/Terrier')  
     .then((response) => {
        return response.json();
      })
     .then(json => {
        const dogCards = json.dogs.map(dog => (
          <DogCard
            key={dog.uuid}
            dog={dog}
            onPress={() => this.openDogDetails(dog)}
          />
        ));
        this.setState({ dogCards })
      })
      .catch(err => {
        console.log(err);
      });
  }

  render () {
    /*const dogs = [{
      uuid: '6e95e91c-e041-11e6-9609-3eacf89e45ff',
      usr_type: 'American Staffordshire Terrier',
      name: 'Buttman Long Long Name',
      photo: 'http://i.imgur.com/A79quK6.png'
    }, {
      uuid: '19acabf8-e022-11e6-b889-b8e85642309e',
      usr_type: 'Corgi',
      photo: 'http://i.imgur.com/A79quK6.png'
    }, {
      uuid: '4cb2585e-e040-11e6-9609-3eacf89e45ff',
      name: 'Borkley',
      usr_type: 'Chihuahua',
      photo: 'http://i.imgur.com/A79quK6.png'
    }]; // TODO IMLPEMENT API HERE*/

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
    alignItems: 'flex-start',
  }
});

SceneLostDogRecognized.propTypes = {
  photo: React.PropTypes.string.isRequired
};

export default SceneLostDogRecognized;
