import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { AppRouter } from './router/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppTheme } from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppTheme>
        <AppRouter/>
      </AppTheme>
    </Provider>
  </React.StrictMode>,
)
