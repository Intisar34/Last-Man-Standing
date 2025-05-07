// Libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mqtt from 'mqtt';

// MQTT connection 
const MQTT_BROKER = 'ws:///172.20.10.3:9001';
const MQTT_TOPIC = "game/command";
const client = mqtt.connect(MQTT_BROKER);


const StartScreen = () => {
  const [gameState, setGameState] = useState('not_started');
  const navigate = useNavigate();

  useEffect(() => {
    client.on('connect', () => {
      console.log('Connected to MQTT');
    });

    client.on('error', (err) => {
      console.error('MQTT Error:', err);
      alert('MQTT Error: Could not connect to broker.');
    });

    return () => {
      client.end();
    };
  }, []);

  const sendCommand = (cmd) => {
    if (client.connected) {
      client.publish(MQTT_TOPIC, cmd);
    } else {
      alert('ERROR: MQTT Not Connected.');
    }
  };
  // Start button signals
  const startGame = () => {
    setGameState('running');
    sendCommand('start');
    navigate('/Countdown');
  };
  // Page layout
  return (
    <div style={styles.background}>
      <h1 style={styles.header}>Last Man Standing</h1>
      <div style={styles.buttonGroup}>
        {gameState === 'not_started' && (
          <button style={{ ...styles.button, backgroundColor: '#28a745' }}
            onClick={startGame}>Start Game</button>)}
      </div>
    </div>
  );
};

// Page styling and formatting
const styles = {
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
    color: '#fff',
    padding: '12px 80px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
};

export default StartScreen;