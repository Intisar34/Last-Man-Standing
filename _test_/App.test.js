import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomeScreen from '../Homescreen';

test('navigates to the register screen on button press', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <HomeScreen />
    </MemoryRouter>
  );

  const registerButton = getByText(/Register/i);
  fireEvent.press(registerButton);

  // Verify navigation to the register screen (e.g., check for a text or element specific to RegisterScreen)
  expect(getByText(/Register Form/i)).toBeTruthy(); // Assuming "Register Form" is text in RegisterScreen
});