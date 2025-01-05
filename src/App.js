import './App.css';
import { bubbleSort } from './algorithms/bubbleSort';
import { heapSort } from './algorithms/heapSort';
import { insertionSort } from './algorithms/insertionSort';  
import { mergeSort } from './algorithms/mergeSort';
import { quickSort } from './algorithms/quickSort';
import { selectionSort } from './algorithms/selectionSort';

import { useState, useEffect, useCallback, useRef } from 'react';
import Bar from './components/Bar';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [array, setArray] = useState([]);
  const [comparingIndexes, setComparingIndexes] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [isPaused, setIsPaused] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  
  // Use refs to maintain latest state values for the sorting algorithm
  const isPausedRef = useRef(false);
  const isResetRef = useRef(false);

  const generateArray = useCallback(() => {
    const newArray = Array.from({length: 50}, () => 
      Math.floor(Math.random() * (500 - 5 + 1)) + 5
    );
    setArray(newArray);
    setComparingIndexes([]);
  }, []);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // Update refs when state changes
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    isResetRef.current = isReset;
  }, [isReset]);

  const handleReset = useCallback(() => {
    isResetRef.current = true;
    setIsReset(true);
    setIsSorting(false);
    setIsPaused(false);
    isPausedRef.current = false;
    generateArray();
    
    // Reset flags after a short delay
    setTimeout(() => {
      setIsReset(false);
      isResetRef.current = false;
    }, 100);
  }, [generateArray]);

  const startNewSort = useCallback(async () => {
    if (!selectedAlgorithm || isSorting) return;
    
    setIsSorting(true);
    setIsReset(false);
    setIsPaused(false);
    isPausedRef.current = false;
    isResetRef.current = false;

    const onCompare = (newArray, indexes) => {
      setArray([...newArray]);
      setComparingIndexes(indexes);
    };

    const delayMs = Math.floor(300 * (1 - speed / 100)) + 1;
    
    try {
      switch(selectedAlgorithm) {
        case 'bubble':
          await bubbleSort(
            array,
            onCompare,
            delayMs,
            () => isPausedRef.current,
            () => isResetRef.current
          );
          break;
        case 'heap':
          await heapSort(
            array,
            onCompare,
            delayMs,
            () => isPausedRef.current,
            () => isResetRef.current
          );
          break;
        case 'insertion':
          await insertionSort(
            array,
            onCompare,
            delayMs,
            () => isPausedRef.current,
            () => isResetRef.current
          );
          break;
        case 'merge':
          await mergeSort(
            array,
            onCompare,
            delayMs,
            () => isPausedRef.current,
            () => isResetRef.current
          );
          break;
        case 'quick':
          await quickSort(
            array,
            onCompare,
            delayMs,
            () => isPausedRef.current,
            () => isResetRef.current
          );
          break;
        case 'selection':
          await selectionSort(
            array,
            onCompare,
            delayMs,
            () => isPausedRef.current,
            () => isResetRef.current
          );
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Sorting error:', error);
    }
    
    if (!isResetRef.current) {
      setIsSorting(false);
      setIsPaused(false);
      isPausedRef.current = false;
    }
}, [selectedAlgorithm, array, speed, isSorting]);

  return (
    <div className="App">
      <header className="header">
        <h1>Algorithm Visualizer</h1>
        <div className="controls">
          <select 
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            className="algorithm-select"
            disabled={isSorting}
          >
            <option value="">Choose Algorithm</option>
            <option value="bubble">Bubble Sort</option>
            <option value="heap">Heap Sort</option>
            <option value="quick">Quick Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="selection">Selection Sort</option>
          </select>
          <button 
            className="visualize-button" 
            onClick={startNewSort}
            disabled={!selectedAlgorithm || isSorting}>
            Visualize {selectedAlgorithm.charAt(0).toUpperCase() + selectedAlgorithm.slice(1)}
          </button>
          <button 
            className="generate-button"
            onClick={generateArray}
            disabled={isSorting}
          >
            Shuffle
          </button>
          <button 
            className="pause-button"
            onClick={() => setIsPaused(prev => !prev)}
            disabled={!isSorting}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button 
            className="reset-button"
            onClick={handleReset}
          >
            Reset
          </button>
          <div className="speed-container">
            <label>Speed:</label>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="speed-slider"
              disabled={isSorting && isPaused}
            />
            <span>{speed}%</span>
          </div>
        </div>
      </header>
      <div className="array-container">
        {array.map((value, idx) => (
          <Bar
            key={idx}
            height={value}
            color={
              comparingIndexes.includes(idx) 
                ? '#FF4081' 
                : '#2196F3'
            }
          />
        ))}
      </div>
    </div>
  );
}

export default App;