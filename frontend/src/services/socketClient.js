import {io} from 'socket.io-client';

let socket = null;

export function connectSocket(){
    if(!socket){
        socket = io('http://localhost:3000');
    }
    return socket;
}

export function subscribeToLog(socket,callback) {
    if (!socket) {
        console.error('Socket not connected');
        return;
    }
    socket.on("state_log", callback);
}

export function unsubscribeFromLog(socket, callback) {
    if (!socket) {
        console.error('Socket not connected');
        return;
    }
    socket.off("state_log", callback);
}