import React from 'react';
import ReactDOM from 'react-dom/client';

import 'antd/dist/antd.min.css'

import 'bootstrap/dist/css/bootstrap-utilities.min.css'

import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);


