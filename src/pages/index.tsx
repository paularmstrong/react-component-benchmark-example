import * as React from 'react';
import App from '../components/App';

export default function BenchmarkHome() {
  return (
    <div className="wrapper">
      <App />
      <div className="attribution">
        <h1 className="title">
          <a href="https://github.com/paularmstrong/react-component-benchmark">React Component Benchmark</a>
        </h1>
        Created with 💙 by <a href="https://paularmstrong.dev">Paul Armstrong</a>
      </div>
    </div>
  );
}
