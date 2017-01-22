import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-material-ui';

class ThankYou extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Your dog has been added to the list of missing dogs.</Text>
        <Text style={styles.infoText}>We hope you find your furry friend again soon!</Text>
        <Button
          style={{container: styles.home}}
          raised accent
          text='Home'
          icon='home'
          onPress={() => {
            this.props.navigate.pop();
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  infoText: {
    padding: 8,
    fontSize: 32
  },
  home: {
  }
});
export default ThankYou;
