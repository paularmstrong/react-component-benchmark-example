'use client';
import * as React from 'react';
import { Benchmark } from 'react-component-benchmark';
import type { BenchmarkRef, BenchResultsType, BenchmarkType } from 'react-component-benchmark';
import Results from './Result';
import { TestCases, TestCase } from './TestCases';
import type { ResultEntry } from './Result';

export default function BenchmarkHome() {
  const benchmarkRef = React.createRef<BenchmarkRef>();
  const [benchmarkType, setBenchmarkType] = React.useState<BenchmarkType>('mount');
  const [componentName, setComponent] = React.useState<TestCase>('Tree');
  const [samples, setSamples] = React.useState(50);
  const [running, setRunning] = React.useState(false);
  const [results, dispatch] = React.useReducer(resultsReducer, [] as Array<ResultEntry>);

  const handleComplete = (result: BenchResultsType) => {
    dispatch({ result, type: benchmarkType, component: componentName });
    setRunning(false);
  };

  const handleChangeComponent = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setComponent(event.target.value as TestCase);
  };

  const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBenchmarkType(event.target.value as BenchmarkType);
  };

  const handleStart = () => {
    setRunning(true);
    benchmarkRef.current?.start();
  };

  const handleClear = () => {
    dispatch('CLEAR');
  };

  const handleChangeSamples = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setSamples(value);
    }
  };

  return (
    <div className="app">
      <div className="content">
        <div className="form">
          <label>
            Component
            <select disabled={running} onChange={handleChangeComponent}>
              {Object.keys(TestCases).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Benchmark type
            <select disabled={running} onChange={handleChangeType}>
              {['mount', 'update', 'unmount'].map((name) => (
                <option key={name}>{name.toLowerCase()}</option>
              ))}
            </select>
          </label>
          <label>
            Samples
            <input
              disabled={running}
              type="number"
              min={25}
              max={1000}
              step={25}
              value={samples}
              onChange={handleChangeSamples}
            />
          </label>
          <button disabled={running} onClick={handleStart}>
            Start
          </button>
          <button disabled={running || results.length === 0} onClick={handleClear}>
            Clear
          </button>
        </div>

        <div className="results">
          <Results results={results} />
        </div>
      </div>

      <div className="component">
        <Benchmark
          key={`${TestCases[componentName].component}-${benchmarkType}-${results.length}`}
          component={TestCases[componentName].component}
          componentProps={TestCases[componentName].props}
          includeLayout
          onComplete={handleComplete}
          ref={benchmarkRef}
          samples={samples}
          timeout={10000}
          type={benchmarkType}
        />
      </div>
    </div>
  );
}

function resultsReducer(state: Array<ResultEntry>, results: 'CLEAR' | ResultEntry) {
  if (results === 'CLEAR') {
    return [];
  }
  return [...state, results];
}
