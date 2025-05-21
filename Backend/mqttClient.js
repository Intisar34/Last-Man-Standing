// mqttClient.js
import mqtt from 'mqtt';

const MQTT_BROKER = 'ws://<ip_adress>:9001';
const MQTT_TOPIC = 'game/command';

const client = mqtt.connect(MQTT_BROKER);

// Handels connectivity and errors
client.on('connect', () => {
  console.log('Connected to MQTT');
});

client.on('error', (err) => {
  console.error('MQTT Error:', err);
});

// Client and topic export variables
export const mqtt_client = client;
export const game_topic = MQTT_TOPIC;

// Handles sent commands
export const sendCommand = (cmd) => {
  if (client.connected) {
    client.publish(MQTT_TOPIC, cmd);
    return true;
  }
  console.error('MQTT Not Connected');
  return false;
};
