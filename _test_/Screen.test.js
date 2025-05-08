
import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../Homescreen';

test('renders title text', () => {
  const { getByText } = render(<HomeScreen />);
  expect(getByText(/Last Man Standing/i)).toBeTruthy();
});

test('renders description text', () => {
  const { getByText } = render(<HomeScreen />);
  expect(getByText(/Can you make it to the finish line without getting caught?/i)).toBeTruthy();
});