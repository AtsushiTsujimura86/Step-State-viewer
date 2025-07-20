import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect} from 'react';
import MermaidChart from './components/MermaidChart';
import FileUploader from './components/FileUploader';
import StateLogViewer from './components/StateLogViewer';

function App() {
    const [stateLogs, setStateLogs] = useState(["STATE: EX"]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleLogLoad = (logs) => {
        setStateLogs(logs);
        setCurrentIndex(0);
    }

    const handleNext = () => {
        if (currentIndex < stateLogs.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };


  return (
    <div className="App">
      <h2>ログステップ実行ビューア</h2>
      <FileUploader onLoad={handleLogLoad} />
      <button
        onClick={handleNext}
        disabled={currentIndex >= stateLogs.length - 1}
        style={{ marginTop: "10px" }}
      >
        次のステップ →
      </button>
      <StateLogViewer logs={stateLogs} currentIndex={currentIndex} />
    </div>
  );
}

export default App;
