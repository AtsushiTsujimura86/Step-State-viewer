import React, { useState, useEffect } from "react";
import { getStateLines } from "../logic/stateHandler";

function StateJsonFileUploader({ onLoad }) {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if(!file) return;
        // ファイルリーダーを使用してファイルを読み込む
        const reader = new FileReader();
        // ファイル読み込み完了時の処理, addEventListenerみたいな
        reader.onload  = (event) => {
            const content = event.target.result;
            console.log("File content:", content);
            try{
                const jsonData = JSON.parse(content);
                console.log("Parsed JSON:", jsonData);
            } catch (error) {
                console.error("Error parsing JSON:", error);   
            }
            onLoad(jsonData);
        };
        // ファイルをjsonとして読み込む
        reader.readAsText(file);
        // JSONパースして状態を設定
    }
    return (
        <div>
            <label htmlFor="">Input json file</label>
            <input type="file" accept=".json" onChange={handleFileUpload} />;
        </div>
    );
}

export default StateJsonFileUploader;