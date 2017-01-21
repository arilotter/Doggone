import React, { Component } from 'react';
import { Card } from 'react-native-material-ui';
import { View, Picker, StyleSheet } from 'react-native';
import toTitleCase from 'titlecase';
import DogTypes from '../DogTypes';

class SceneBrowseDogs extends Component {
  constructor (props) {
    super(props);

    this.state = {
      dogStatus: props.dogStatus || 'lost',
      dogType: props.dogType || 'all'
    };
  }
  render () {
    // TODO Sorting based on search confidence
    const options = DogTypes.dogTypes
      .map(type => <Picker.Item key={DogTypes.dogTypes.indexOf(type)} label={toTitleCase(type)} value={type} />);
    return (
      <View>
        <Card>
          <Picker
            style={styles.typePicker}
            selectedValue={this.state.dogType}
            onValueChange={dogType => this.setState({dogType})}
          >
            {options}
          </Picker>
        </Card>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  typePicker: {
  }
});

export default SceneBrowseDogs;
