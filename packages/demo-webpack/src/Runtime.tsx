import React from 'react';

export const Runtime: React.FC = React.memo(() => {
  return (
    <div>
      <h2>Install Runtime</h2>

      <p>
        <code>source-ref-runtime</code> help you checkout source and fast click
        to jump to vscode or other path
      </p>

      <div>
        Now <code>source-ref-runtime</code> support those way to open your
        soucecode:
      </div>
      <ul>
        <li>vscode</li>
        <li>github</li>
      </ul>

      <pre>
        <code>npm install source-ref-runtime</code>
      </pre>

      <p>
        in your source code<code>index.js</code>:
      </p>

      <pre>
        <code>
          {`
import { start as startSR } from 'source-ref-runtime';

startSR()`}
        </code>
      </pre>

      <p>Or you also can lazy load it:</p>

      <pre>
        <code>
          {`import('source-ref-runtime').then((module) => module.start())`}
        </code>
      </pre>
    </div>
  );
});
Runtime.displayName = 'Runtime';
