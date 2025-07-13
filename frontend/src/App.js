import logo from './logo.svg';
import './App.css';
import MermaidChart from './components/MermaidChart';
import {connectSocket, subscribeToLog, unsubscribeFromLog } from './services/socketClient';
import {getCurrentStateFromLog} from './logic/stateHandler';
import { useEffect, useState } from 'react';

function App() {
  const [currentState, setCurrentState] = useState('IDLE');

  useEffect(() => {
    const socket = connectSocket();
    
    const handleLog = (log) => {
      console.log('Received log:', log);
      const newState = getCurrentStateFromLog(log);
      if(newState) setCurrentState(newState);
    };
    
    subscribeToLog(socket, handleLog);
    console.log('Subscribed to log updates');
    return () => {
      unsubscribeFromLog(socket, handleLog);
    };
  }, []);

  return (
    <div className="App">
      <h1>Post Test</h1>
      {/* <Log /> */}
      <h2>現在の状態：{currentState}</h2>
      <MermaidChart  currentState={currentState}/>
    </div>
  );
}

export default App;
