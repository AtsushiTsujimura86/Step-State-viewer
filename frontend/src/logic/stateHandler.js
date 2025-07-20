import { useEffect } from "react";

export function getStateLines(logText){
    // 改行で分割
    const lines = logText.split(/\r?\n/); 
    return lines.filter((line) => line.includes("STATE:"));
}