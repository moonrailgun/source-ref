import React from 'react';

export const Options: React.FC = React.memo(() => {
  return (
    <div>
      <details>
        <summary>Shared Options:</summary>

        <div>
          <pre>
            <code>{`interface Options {
  available?: boolean; // Only in webpack loader
  opener?: {
    type: 'vscode';
  } | {
    type: 'github';
    url: string; // full url(for example: https://github.com/moonrailgun/source-ref)
    branch?: string; // branch name
    cwd?: string; // project root path, default is process.cwd()
  } | {
    type: 'jetbrains';
    port?: number; // jetbrains local server port(if you modify it)
  };
}`}</code>
          </pre>
        </div>
      </details>
    </div>
  );
});
Options.displayName = 'Options';
