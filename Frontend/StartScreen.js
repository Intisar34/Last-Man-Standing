// Libraries
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { View, Text, Button, StyleSheet} from 'react-native';
import { sendCommand } from './components/mqttClient';

// Handle page navigation
const StartScreen = () => {
  const [gameState, setGameState] = useState('not_started');
  const navigate = useNavigate();

  // Start button signals
  const startGame = () => {
    setGameState('running');
    sendCommand('start');
    navigate('/Countdown');
  };

  // Page layout
  return (
    <View style={styles.background}>
      <Text style={styles.header}>Last Man Standing</Text>
      <View style={styles.button}>
        {gameState === 'not_started' && (
          <Button title="Start Game" onPress={startGame} color= '#28a745'/>)}
      </View>
    </View>
  );
};

// Page styling and formatting
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#2b5876',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    font: 'Beachside',
    fontSize: 80,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  }

});

export default StartScreen;