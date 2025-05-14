import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { mqtt_client } from './mqttClient';

// Initialize finish button 
const FinishButton = () => {
  const handlePress = () => {
    // Stop the timer
    onFinish();
    
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
 
