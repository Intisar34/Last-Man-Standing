
import React from 'react';
import Countdown from './Countdown';

export default function App() {
  return (
    <div style={styles.container}>
      <Countdown />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#fff',
  },
};

