import React from 'react';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function Log() {
    const [message, setMessage] = useState('');
    const [log, setLog] = useState([]);
    
    const handleSendMessage = ()=>{
        if(message.trim() === "")return;
        socket.emit("send_message",message);
        setMessage('');
    }

    useEffect(() => {
        const handleLog = (data) => {
            setMessage(data);
        };

        socket.on('log', handleLog);

        // Clean up the socket connection when the component unmounts
        //reactのクリーンアップ関数、useEffectのreturnで行う、アンマウント時に実行される
        return () => {
            socket.off('log', handleLog);
        };
    }, []);


    return(
        <div>
            <h2>Socket Chat</h2>
            <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Type your message here..." />
            <button onClick={handleSendMessage}>Send</button>

            <p>{message}</p>
            {/* <ul>
                {log.map((msg, i) => (
                    <li key={i}>{msg}</li>
                ))}
            </ul> */}
        </div>
    )
}

export default Log;