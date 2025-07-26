import React, { useLayoutEffect, useState } from 'react';

function getMermaidString(stateJson) {
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
        return mermaidString;
    } catch (error) {
        console.error("<Error parsing state JSON>:", error);
    }


}

export default getMermaidString;