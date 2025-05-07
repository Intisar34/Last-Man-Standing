import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last Man Standing</Text>
      <Text style={styles.description}>Can you make it to the finish line without getting caught?</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigate('/register')}>
      <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

//Page formatting
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:  '#2b5876',
    padding: 300,
    justifyContent: 'center',
  },
  title: {
    font: 'Beachside',
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  description: {
    font: 'Beachside',
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }  
  
});

export default HomeScreen;