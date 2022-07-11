import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import { AtlasProvider, RealmProvider } from './realm';
import reportWebVitals from './reportWebVitals';
import styles from './styles';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <RealmProvider>
        <AtlasProvider>
          <LeafygreenProvider>
            <ThemeProvider theme={theme}>
              <Global styles={styles} />
              <App />
            </ThemeProvider>
          </LeafygreenProvider>
        </AtlasProvider>
      </RealmProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// reportWebVitals(console.log);
