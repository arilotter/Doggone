import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Card, ListItem } from 'react-native-material-ui';

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  card: {
    width: 256,
  },
  cardTitle: {
    fontSize: 26,
  },
  image: {
    height: 128,
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
          source={{uri: 'http://i.imgur.com/A79quK6.png'}}
          style={styles.image}
        >
        </Image>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>
            {this.props.name || this.props.breed}
          </Text>
        </View>
      </Card>
    );
  }
}

export default DogCard;
