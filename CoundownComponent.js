import React from 'react';
import Countdown from './Countdown';
import { View,StyleSheet} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Countdown />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

