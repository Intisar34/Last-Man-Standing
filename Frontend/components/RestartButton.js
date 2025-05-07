// Libraries
import React from 'react';
import mqtt from 'mqtt';
import {Dimensions} from 'react-native';

// MQTT connection 
const MQTT_BROKER = 'ws://172.20.10.3:9001';
const MQTT_TOPIC = 'game/command';
const client = mqtt.connect(MQTT_BROKER);


// Handles mqtt and restart signal commands
const RestartButton = () => {
  const sendRestartCommand = () => {
    if (client.connected) {
      client.publish(MQTT_TOPIC, 'restart');
    } else {
      alert('ERROR: MQTT Not Connected.');
    }
  };

  // Page styling and formatting
  return (
    <button
      style={{
        backgroundColor: '#ffc107',
        padding: '12px 80px',
        borderRadius: '10px',
        color: '#000',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
      }}
      onClick={sendRestartCommand}>Restart</button>
  );
};

export default RestartButton;