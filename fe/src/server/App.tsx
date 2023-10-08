import * as React from 'react';
import { App } from '../components/App';

export const ServerApp: React.FC<{}> = () => {
  return (
  <html>
    <head>
      <meta charSet="utf-8" />
      <title>FE</title>
    </head>
    <body>
    <div id='root'>
      <App />
    </div>
    </body>
  </html>
  )
};
