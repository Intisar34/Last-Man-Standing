import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput} from 'react-native';
import { useNavigate } from 'react-router-dom';
import LinearGradient from 'react-native-web-linear-gradient';
import { supabase } from '../Backend/supabaseClient'; 

//Display Register Screen
const RegisterScreen = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phonenumber: "",
    score: 0,
  });

  const navigate = useNavigate();

  // Handles updates in the respective input field
  const handleChange = (field, value) => {
    setForm(previous => ({ ...previous, [field]: value })); 
  };

  // Handles validity of email and phonenumber.
  const isValid = () => {

  if (!form.username || !form.email || !form.phonenumber) {
    alert('Missing Info. Please fill in all fields.');
    return;
  }
  
  if(!form.email.includes('@') || !form.email.includes('.')) {
    alert('Invalid Email. Please enter a valid email address.')
    return false;
  }

  if(form.phonenumber.length !== 10 || isNaN(form.phonenumber)) {
    alert('Invalid Phone Number. Please enter 10 digit number.')
    return false;
  };

  return true;

};

  // Handles the registration process when the user is done.
  const handleRegister = async () => {
    const { username, email, phonenumber, score} = form;

    if (!isValid()){
      return;
    }
  
      //checks the username in the database
      const { data: userExists } = await supabase
        .from('users')
        .select('username')
        .eq('username', username);
  
        // Displays an error if username found
        if (userExists.length > 0) {
        alert('Username already exists.');
        return;
      }
      
      //inserts information entered by the user into the database 
      await supabase
      .from('users')
      .insert([{ username, email, phone_number:phonenumber,score }]);

      alert(`Welcome to Last Man Standing, ${username}!`);
      navigate(-1);
    };

  return (
    <View style={styles.background}>
      <LinearGradient  
        colors={['#FF0000', '#800080', '#0000FF']} 
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
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

      <Button title='Register' onPress={handleRegister} color= '#28a745' />
      <View style={{ marginTop: 10 }}>
        <Button title='Cancel' onPress={() => navigate(-1)} color='#555' />
      </View>
      </LinearGradient>
    </View>
  );
};

//Styling of the page
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
    textAlign: 'center',
    font: 'Beachside',
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
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

export default RegisterScreen;