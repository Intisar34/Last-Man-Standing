import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-dom';
import LinearGradient from 'react-native-web-linear-gradient';

const LoginScreen = () => {
  const [form, setForm] = useState({
    username: ""
  });

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    alert(`Logged in successfully as ${form.username}`);
    navigate('/startpage');
  };

  return (
    <View style={styles.background}>
      <LinearGradient  
        colors={['#FF0000', '#800080', '#0000FF']} 
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
      <Text style={styles.header}>Login</Text>
      <Text style={styles.description}>Please enter your username to log in.</Text>

      <TextInput
        style={styles.input}
        placeholder='Username'
        value={form.username}
        onChangeText={text => handleChange('username', text)}
      />

      <Button title="Login" onPress={handleLogin} color="#28a745" />

      <View style={{ marginTop: 10 }}>
        <Button title="Cancel" onPress={() => navigate(-1)} color="#555" />
      </View>
      </LinearGradient>
    </View>
  );
};

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
header: {
  font: 'Beachside',
  fontSize: 60,
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: 20,
},
  description: {
    font: 'Beachside',
    fontSize: 30,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
});

export default LoginScreen;