import React from 'react';
import { createRoot } from 'react-dom/client';

import('source-ref-runtime').then((module) => {
  console.log('[source-ref-runtime] loaded!');
  module.start();
});

const App = React.memo(() => {
  return <div>Alt + Click Here</div>;
});

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
