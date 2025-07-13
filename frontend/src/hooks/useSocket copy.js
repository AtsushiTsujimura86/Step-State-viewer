import { useEffect } from "react";
import {io} from "socket.io-client";

const socket = io('http://localhost:3000');

function useSocket(onStateUpdate) {
    useEffect(() => {
        const handleState = (data) => {
            
        }

        socket.on("state_log", handleState);
        return () => {
            socket.off("state_log", handleState);
        };
    })

    return []
}

export default useSocket;