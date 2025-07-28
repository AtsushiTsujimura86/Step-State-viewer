import React, { useLayoutEffect, useState } from 'react';


// マーメイド形式の文字列を生成
function getMermaidString(stateJson, currentState) {
    try {
        const { states, transitions, initialState } = stateJson;
        
        // 初期状態を設定
        let mermaidString = `
            stateDiagram-v2
            [*] --> ${initialState}
        `;

        //遷移を追加
        transitions.forEach(({ from, to }) => {
            mermaidString += `
            ${from} --> ${to}
            `;
        });

        //ハイライトのためのスタイルを追加
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