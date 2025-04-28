import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import mqtt from 'mqtt';

// mqtt broker connection
const MQTT_BROKER = 'ws://172.20.10.2:9001';
const MQTT_TOPIC = 'game/command';
const client = mqtt.connect(MQTT_BROKER);

const GameScreen = () => {
  const [gameState, setGameState] = useState('not_started');
  const [progress, setProgress] = useState(0);

  // check connection with the mqtt broker
  useEffect(() => {
    client.on('connect', () => {
      console.log('Connected to MQTT');
    });

    client.on('error', (err) => {
      console.error('MQTT Error:', err);
      window.alert('MQTT Error: Could not connect to broker.');
    });

    return () => {
      client.end();
    };
  }, []);

  const sendCommand = (cmd) => {
    if (client.connected) {
      client.publish(MQTT_TOPIC, cmd);
    } else {
      window.alert('ERROR: MQTT Not Connected. ');
    }
  };

  const startGame = () => {
    setProgress(0);
    setGameState('running');
    sendCommand('start');
  };

  const restartGame = () => {
    setProgress(0);
    setGameState('running');
    sendCommand('restart');
  };

  // restarting the game
  useEffect(() => {
    if (gameState === 'running') {
      const id = setInterval(() => {
        setProgress((prev) => {
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(id);
    }
  }, [gameState]);

  // The structure and formatting of the page
  return (
    <View style={styles.background}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Text style={styles.header}>Last Man Standing</Text>
        <Text style={styles.progress}>Progress: {progress} sec</Text>

        <View style={styles.buttonGroup}>
          {gameState === 'not_started' && (
            <GameButton title="Start Game" onPress={startGame} color="#28a745" />
          )}
          {gameState === 'running' && (
            <GameButton title="Restart" onPress={restartGame} color="#ffc107" />
          )}
          {gameState === 'ended' && (
            <GameButton title="Restart" onPress={restartGame} color="#17a2b8" />
          )}
        </View>
      </View>
    </View>
  );
};

// styling the buttons
const GameButton = ({ title, onPress, color }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default GameScreen;

// page styling
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#2b5876',
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',   
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  progress: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 30,
  },
  buttonGroup: {
    width: '100%',
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
