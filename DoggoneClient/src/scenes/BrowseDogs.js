import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DogPicker from '../components/DogPicker';
import DogCard from '../components/DogCard';

class SceneBrowseDogs extends Component {
  constructor (props) {
    super(props);
    this.state = {
      breed: 'all'
    };
    this._fetchDogs = this._fetchDogs.bind(this);
  }

  componentDidMount () {
    this._fetchDogs(this.state.breed);
  }

  _fetchDogs (breed) {
    global.fetch(global.backend + `/find/found/${global.lat}/${global.lon}/2000000/${breed}/${breed}`)
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
    this.setState({breed});
  }
  render () {
    return (
      <View>
        <DogPicker
          value={this.state.breed}
          onValueChange={this._fetchDogs} />
        <ScrollView contentContainerStyle={styles.dogsContainer}>
          {this.state.dogCards}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  dogsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  }
});

export default SceneBrowseDogs;
