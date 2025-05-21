import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
<<<<<<< HEAD:Frontend/components/FinishButton.js
import { mqtt_client } from './mqttClient';
import { saveScore } from '../../Backend/scores';
import { useNavigate } from 'react-router-dom';
=======
import { mqtt_client } from '../Backend/mqttClient';
>>>>>>> 01ed244ce45f830b0c1188f7d7fb17c0b028f600:Frontend/FinishButton.js

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
        navigate('/leaderboard');
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
 
