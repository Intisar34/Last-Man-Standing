import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RestartButton from './components/RestartButton';
import FinishButton from './components/FinishButton';
import LinearGradient from 'react-native-web-linear-gradient';

export default function CountdownTimer() {
    // View components on screen
  return (
    <View style={styles.background}>
      <LinearGradient  
        colors={['#FF0000', '#800080', '#0000FF']} // Mix colors for gradient effect
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
      <Text style={styles.header}>Tick Tock...</Text>
      <View style={styles.timer_background}>
      </View>
      <RestartButton />
      <FinishButton/>
      </LinearGradient>
    </View>
  );

};

// Page format and styling
const styles = StyleSheet.create({
  background: {
    height: '100vh',
    width: '100vw'
},
linearGradient: {
  height: '100vh',
  width: '100vw',
  justifyContent: 'center',  
  alignItems: 'center',       
  paddingTop: 0,         
},
  header: {
    font: 'Beachside',
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  }
});