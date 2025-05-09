// Libraries
import React from 'react';
import { sendCommand } from './mqttClient';


// Handles mqtt and restart signal commands
const RestartButton = () => {
  const sendRestartCommand = () => {
    sendCommand('restart');
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