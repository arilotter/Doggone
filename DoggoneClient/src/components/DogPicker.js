import React, { Component } from 'react';
import { Picker } from 'react-native';
import { Card } from 'react-native-material-ui';
import toTitleCase from 'titlecase';
import DogTypes from '../DogTypes';

class DogPicker extends Component {
  render () {
    const topBreeds = this.props.classification || [];

    const merged = topBreeds
    .sort((a, b) => b.confidence - a.confidence)
    .map(breed => breed.dog_type)
      .concat(this.props.hideUnclassified ? [] : DogTypes.dogTypes.filter(current => topBreeds.indexOf(current) === -1))
    .map(type => <Picker.Item key={DogTypes.dogTypes.indexOf(type)} label={toTitleCase(type)} value={type} />);

    return (
      <Card>
        <Picker
          selectedValue={this.props.value || 'all'}
          onValueChange={this.props.onValueChange}
        >
          {merged}
        </Picker>
      </Card>
    );
  }
}

export default DogPicker;
