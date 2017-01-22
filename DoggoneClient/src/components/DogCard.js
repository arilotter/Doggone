import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { Card } from 'react-native-material-ui';

const styles = StyleSheet.create({
  textContainer: {
    padding: 8
  },
  card: {
    width: (Dimensions.get('window').width / 2) - 16,
    maxWidth: 256,
  },
  cardTitle: {
    fontSize: 26
  },
  image: {
    height: 128
  }
});

class DogCard extends Component {
  render () {
    return (
      <Card
        onPress={this.props.onPress}
        style={{container: styles.card}}
      >
        <Image
          source={{uri: 'http://104.236.201.25/woof/' + this.props.dog.uuid + '.jpg'}}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>
            {this.props.dog.name || this.props.dog.usr_type}
          </Text>
        </View>
      </Card>
    );
  }
}

export default DogCard;
