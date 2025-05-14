import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

// Initialize finish button 
const FinishButton = () => {
  return (
      // View button on screen
    <View style={styles.button}> 
      <Button 
        title="Finish Game" 
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
 
