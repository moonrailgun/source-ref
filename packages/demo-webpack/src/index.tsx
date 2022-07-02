import React from 'react';
import { createRoot } from 'react-dom/client';
import { start as startSR } from 'source-ref-runtime';

startSR();

const paddingStyle: React.CSSProperties = {
  padding: 8,
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
};

const App = React.memo(() => {
  return (
    <div>
      <div>Alt + Click Here</div>

      {Array.from({ length: 50 }).map(() => (
        <div>Loop</div>
      ))}

      <div style={paddingStyle}>
        <div style={paddingStyle}>
          <div style={paddingStyle}>
            <div style={paddingStyle}>
              <div style={paddingStyle}>
                <div style={paddingStyle}>
                  <div>Nested</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
