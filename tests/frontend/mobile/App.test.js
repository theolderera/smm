// tests/frontend/mobile/App.test.js

import { render } from '@testing-library/react-native';
import App from '../../frontend/mobile/App';

test('renders App correctly', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Get Started/i)).toBeTruthy();
});