import { useEffect } from "react";

export function getCurrentStateFromLog(log) {
    if (log.startsWith("STATE:")){
        return log.split("STATE:")[1].trim();
    }   
    return null;
}