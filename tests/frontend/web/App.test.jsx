// tests/frontend/web/App.test.jsx

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import App from '../../frontend/web/src/App';
import store from '../../frontend/web/src/store';
import i18n from '../../frontend/web/src/config/i18n';

test('renders App correctly', () => {
  render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  );
  expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
});