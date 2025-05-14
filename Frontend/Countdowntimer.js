import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import RestartButton from './components/RestartButton';
import FinishButton from './components/FinishButton';
import LinearGradient from 'react-native-web-linear-gradient';

export default function CountdownTimer() {
  const [time_left] = useState(60);
  const animation_progress = useRef(new Animated.Value(60)).current;

  const get_progress_width = animation_progress.interpolate({ // cconvert seconds into procentage
    inputRange: [0, 60],
    outputRange: ['0%', '100%']
  });

  const get_progress_color = () => { // change time according to how many seconds left
    if (time_left > 45) return '#4CAF50';
    else if (time_left > 30) return '#FFC107';
    else if (time_left > 15) return '#FF9800';
    else return '#F44336';
  };

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
      <Animated.View style={[styles.timer_progress, 
            { width: get_progress_width,
              backgroundColor: get_progress_color() }]} />
      </View>
      <RestartButton />
      <FinishButton currentTime={time_left} onFinish={() => {}}/>
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
  },
  timer_background: {
    width: '40%',
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 60,
  },
  timer_progress: {
    height: '100%',
    borderRadius: 15,
  }
});