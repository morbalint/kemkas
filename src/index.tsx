import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';

const faro = window.location.hostname === 'localhost' ? undefined : initializeFaro({
    url: 'https://faro-collector-prod-eu-west-2.grafana.net/collect/88adcc2543da5af525c451166286f2cc',
    app: {
        name: 'kemkas',
        version: '1.0.0',
        environment: 'production'
    },
    instrumentations: [
        // Mandatory, overwriting the instrumentations array would cause the default instrumentations to be omitted
        ...getWebInstrumentations(),

        // Initialization of the tracing package.
        // This packages is optional because it increases the bundle size noticeably. Only add it if you want tracing data.
        // new TracingInstrumentation(),
    ],
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App faro={faro} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
