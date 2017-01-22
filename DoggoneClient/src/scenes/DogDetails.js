import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';

class DogDetails extends Component {
  render () {
    return (
      <View>
        <Image
          style={styles.dogPhoto}
          source={{
            uri: global.backend + '/woof/' + this.props.dog.uuid + '.jpg'
          }}
        />
        <Text style={styles.infoText}>This dog is {this.props.dog.name ? 'named' : this.props.dog.usr_type}</Text>
        <Text style={styles.infoName}>{this.props.dog.name}</Text>
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
  infoName: {
    fontSize: 48,
    padding: 8,
    paddingTop: 0,
    color: 'black'
  }
});
export default DogDetails;
