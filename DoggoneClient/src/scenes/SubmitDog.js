import React, { Component } from 'react';
import { View, Switch, Text, TextInput, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import { Button, Card } from 'react-native-material-ui';
import DogPicker from '../components/DogPicker';

class SubmitDog extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      friendly: false,
      phone: '',
      breed: this.props.classification.reduce((a, b) => a.confidence > b.confidence ? a : b).dog_type
    };
    this._onSubmit = this._onSubmit.bind(this);
    this._canSubmit = this._canSubmit.bind(this);
  }

  _onSubmit () {
    const guessedType = this.props.classification.reduce((a, b) => a.confidence > b.confidence ? a : b).dog_type;
    const data = {
      uuid: this.props.uuid,
      name: this.state.name,
      usr_type: this.state.breed,
      rec_type: guessedType,
      lat: global.lat,
      lon: global.lon,
      friendly: this.state.friendly,
      phone: this.state.phone
    };
    global.fetch(global.backend + '/add/lost', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then();
  }

  _canSubmit () {
    if (this.state.name && this.state.phone) {
      return true;
    }
    return false;
  }

  render () {
    const canSubmit = this._canSubmit();
    return (
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <Image
          style={styles.dogPhoto}
          source={{
            uri: this.props.photo
          }}
        />
        <Text style={styles.bigLabel}>Your dog's info</Text>
        <Card>
          <Text style={styles.label}>What breed is your dog?</Text>
          <DogPicker
            style={styles.dogPicker}
            value={this.state.breed}
            onValueChange={breed => this.setState({breed})}
            hideUnclassified
            classification={this.props.classification}
          />
        </Card>
        <Card>
          <Text style={styles.label}>
            What's your dog's name?
          </Text>
          <TextInput
            autoFocus
            style={styles.dogName}
            onChangeText={name => this.setState({name})}
            value={this.state.name}
            underlineColorAndroid={'#2196F3'}
          />
        </Card>
        <Card>
          <View style={styles.isFriendlyContainer}>
            <Text style={styles.isFriendly}>Is your dog approachable?</Text>
            <Switch
              onValueChange={friendly => this.setState({friendly})}
              value={this.state.friendly}
            />
          </View>
        </Card>

        <Text style={styles.bigLabel}>Your info</Text>

        <Card>
          <Text style={styles.label}>
            What's your phone number?
          </Text>
          <TextInput
            style={styles.dogName}
            keyboardType='phone-pad'
            onChangeText={phone => this.setState({phone})}
            value={this.state.phone}
            underlineColorAndroid={'#2196F3'}
          />
        </Card>

        <View style={styles.submitContainer}>
          <Button
            raised
            accent={canSubmit}
            disabled={!canSubmit}
            text='Submit Lost Dog'
            icon='send'
            style={{ container: styles.submitButton }}
            onPress={this._onSubmit}
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
  },
  isFriendlyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    alignItems: 'center'
  },
  isFriendly: {
    fontSize: 24,
    color: '#2196F3',
    alignSelf: 'flex-start'
  },
  dogPicker: {
    width: Dimensions.get('window').width
  },
  label: {
    fontSize: 24,
    padding: 8,
    color: '#2196F3'
  },
  bigLabel: {
    fontSize: 36,
    fontWeight: 'bold',
    padding: 8,
    color: '#2196F3'
  },
  dogName: {
    width: Dimensions.get('window').width,
    fontSize: 24,
    paddingTop: 0,
    paddingHorizontal: 8
  },
  dogPhoto: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
    marginBottom: 8
  },
  submitContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    padding: 16
  },
  submitButton: {
    width: Dimensions.get('window').width / 2,
    height: 48
  }
});

export default SubmitDog;
