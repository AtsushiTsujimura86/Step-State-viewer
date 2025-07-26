import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect} from 'react';
import MermaidChart from './components/MermaidChart';
import FileUploader from './components/LogFileUploader';
import StateLogViewer from './components/StateLogViewer';
import StateJsonFileUploader from './components/StateJsonFileUploader';

function App() {
    const [stateLogs, setStateLogs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentState, setCurrentState] = useState('IDLE');
    const [stateJson, setStateJson] = useState({});

    const handleLogLoad = (logs) => {
        setStateLogs(logs);
        setCurrentIndex(0);
        if (logs.length > 0) {
            const firstState = logs[0].split("STATE:")[1].trim();
            setCurrentState(firstState);
        }       
    }

    const handleStataJsonLoad = (json) => {
        setStateJson(json);
        console.log("State JSON Loaded:", json);
    
        }
    

    const handleNext = () => {
        if (currentIndex < stateLogs.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setCurrentState(stateLogs[currentIndex+1].split("STATE:")[1].trim());
            console.log("Current Index", currentIndex);
            console.log("Current State:", currentState);
        }
    };


  return (
    <div className="App container">
        <h2>ログステップ実行ビューア</h2>
        <FileUploader onLoad={handleLogLoad} />
        <StateJsonFileUploader onLoad={handleStataJsonLoad} />
        <button
            onClick={handleNext}
            disabled={currentIndex >= stateLogs.length - 1}
            style={{ marginTop: "10px" }}
        >
            次のステップ 
        </button>
        <div style={{ display: 'flex', justifyContent:'center' }}>
            <StateLogViewer logs={stateLogs} currentIndex={currentIndex} />
            <MermaidChart currentState={currentState} stateJson={stateJson}/>
        </div>

    </div>
  );
}

export default App;
