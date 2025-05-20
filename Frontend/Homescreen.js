import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-dom';
import LinearGradient from 'react-native-web-linear-gradient';


const HomeScreen = () => {
  const navigate = useNavigate();
  return (
    <View style={styles.background}>
      <LinearGradient  
        colors={['#FF0000', '#800080', '#0000FF']} 
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
      <Text style={styles.title}>Last Man Standing</Text>
      <Text style={styles.description}>Can you make it to the finish line without getting caught?</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigate('/register')}>
      <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigate('/login')}>
      <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

//Page formatting
const styles = StyleSheet.create({
  background: {
    height: '100vh',
    width: '100vw'
},
linearGradient: {
  height: '100vh',
  width: '100vw',
  justifyContent: 'center',  
  alignItems: 'center',       
  paddingTop: 0,         
},
  title: {
    font: 'Beachside',
    fontSize: 80,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  description: {
    font: 'Beachside',
    fontSize: 30,
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