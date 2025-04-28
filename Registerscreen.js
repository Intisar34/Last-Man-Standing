
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = ({ navigate }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phonenumber: "",
  });

  const navigate = useNavigate();

  //Handles updates in the respective input field
  const handleChange = (field, value) => {
    setForm(previous => ({ ...previous, [field]: value }));
  };

  //Handles the registeration process when the user is done with the registeration
  const handleRegister = () => {
    if (!form.username || !form.email || !form.phonenumber) {
      alert('Missing Info', 'Please fill in all fields.');
      return;
    }
    alert(`Success: Welcome to Last Man Standing, ${form.username}!`);
    navigate('./home')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.description}>Please enter your details to register.</Text>

      <TextInput 
        style={styles.input}
        placeholder='Username'
        value={form.username}
        onChangeText={text => handleChange('username', text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize="none"
        value={form.email}
        onChangeText={text => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Phone Number'
        keyboardType='phone-pad'
        value={form.phonenumber}
        onChangeText={text => handleChange('phonenumber', text)}
      />

      <Button title='Register' onPress={handleRegister} />
      <View style={{ marginTop: 10 }}>
        <Button title='Cancel' onPress={() => navigate(-1)} color='#555' />
      </View>
    </View>
  );
};

//Styling of the page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#8B0000',
    padding: 300,
  },
  
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },

  description: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
});

export default RegisterScreen;
