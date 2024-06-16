import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const CreateBus = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [departureTime, setDepartureTime] = useState(new Date());
  const [arrivalTime, setArrivalTime] = useState(new Date());

  const handleSubmit = async () => {
    const formData = {
      name,
      price,
      departure_time: departureTime.toISOString(),
      arrival_time: arrivalTime.toISOString(),
    };

    try {
      await axios.post(`${API_BASE_URL}/buses/`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      Alert.alert('Bus Created', 'The bus was successfully created.');
      navigation.navigate('BusList');
    } catch (error) {
      Alert.alert('Creation Failed', 'There was an error creating the bus.');
      console.error('Error creating bus:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Bus Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Departure Time</Text>
      <TextInput
        style={styles.input}
        placeholder="Departure Time"
        value={departureTime.toISOString()}
        onChangeText={(text) => setDepartureTime(new Date(text))}
      />

      <Text style={styles.label}>Arrival Time</Text>
      <TextInput
        style={styles.input}
        placeholder="Arrival Time"
        value={arrivalTime.toISOString()}
        onChangeText={(text) => setArrivalTime(new Date(text))}
      />

      <View style={{ height: 20 }} />
      <Button title="Create Bus" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default CreateBus;
