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


  // The restart button
  return (
    <View style={styles.button}>
      <Button title="Restart Game" onPress={sendRestartCommand} color="#ffc107"/>
    </View>
  );
};

// Page styling and formatting
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffc107',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  }
});



export default RestartButton;