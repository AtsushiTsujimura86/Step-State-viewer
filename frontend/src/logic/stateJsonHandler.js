import React, { useLayoutEffect, useState } from 'react';

function getMermaidString(stateJson, currentState) {
    try {
        const { states, transitions, initialState } = stateJson;
        console.log("State JSON:", stateJson);
        console.log("states: ", states);
        console.log("transitions: ", transitions);
        console.log("initialState: ", initialState);
          // Mermaid構文を生成
        let mermaidString = `
            stateDiagram-v2
            [*] --> ${initialState}
        `;

        transitions.forEach(({ from, to }) => {
            mermaidString += `
            ${from} --> ${to}
            `;
        });

        states.forEach((state) => {
            if (state == currentState){
                mermaidString += `
                style ${state} fill:#f9f,stroke:#333,stroke-width:2px;
                `;
            }
            
        });

        console.log("Generated Mermaid String:", mermaidString);
        return mermaidString;
    } catch (error) {
        console.error("<Error parsing state JSON>:", error);
    }


}

export default getMermaidString;