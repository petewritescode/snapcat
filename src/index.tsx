import ReactDOM from 'react-dom';
import { App } from './components/app/app.component';
import { Provider } from 'react-redux';
import { store } from './store/app.store';
import React from 'react';

const Root: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
