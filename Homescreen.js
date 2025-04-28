import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last Man Standing</Text>
      <Text style={styles.description}>Can you make it to the finish line without getting caught?</Text>
      <Button title="Register" onPress={() => navigate('/register')} />
    </View>
  );
};

//Page formatting
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#8B0000',
    padding: 300,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    marginBottom: 20,
  },
});

export default HomeScreen;
