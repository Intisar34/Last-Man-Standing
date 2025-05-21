import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { mqtt_client } from './mqttClient';
import { saveScore } from '../../Backend/scores'
import { useNavigate } from 'react-router-dom';

// Initialize finish button 
const FinishButton = ({ currentTime, onFinish}) => {
  const navigate = useNavigate();

    const handlePress = () => {
      // Stop the timer
      onFinish();
      saveScore(currentTime);

    // Send MQTT command
    mqtt_client.publish('game/command', 'finish');

    setTimeout(() => {
        alert(`Game Finished, Your finishing time is ${currentTime} sec`, [{ text: "OK" }]);
      }, 100);

  };

// View button on screen
  return (
    <View style={styles.button}> 
      <Button 
        title="Finish Game" 
        onPress={handlePress} 
        color="#4CAF50"
      />
    </View>
  );
};

// Provide style to button
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  }
});

export default FinishButton;
 
