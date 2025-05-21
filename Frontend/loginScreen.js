import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-dom';
import LinearGradient from 'react-native-web-linear-gradient';
import { supabase } from '../Backend/supabaseClient'; 


let loggedInUsername = null;

function getLoggedInUsername() {
  return loggedInUsername;
}
//Displays the log in screen
const LoginScreen = () => {
  const [form, setForm] = useState({
    username: ""
  });

  const navigate = useNavigate(); // this is for navigation

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    const { username } = form;

    // checks if username input feild is empty
    if (!username) {
      alert('Please enter your username.');
      return;
    }
    //checks the username in the database
    const { data: userExists } = await supabase
      .from('users')
      .select('username')
      .eq('username', username);
      
    if (userExists.length === 0) {
      alert('Username not found.');
      return;
    }

    loggedInUsername = username;

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
          <Text style={styles.title}>Login</Text>
          <Text style={styles.description}>Please enter your details to login.</Text>

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

export default LoginScreen;
export { getLoggedInUsername };