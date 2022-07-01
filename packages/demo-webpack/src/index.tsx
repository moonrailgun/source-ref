import React from 'react';
import { createRoot } from 'react-dom/client';
import { start as startSR } from 'source-ref-runtime';

startSR();

const App = React.memo(() => {
  return <div>Alt + Click Here</div>;
});

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
