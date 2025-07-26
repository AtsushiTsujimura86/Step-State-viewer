import React, { useState, useEffect } from "react";
import { getStateLines } from "../logic/stateHandler";
import "../layout.css"

function StateJsonFileUploader({ onLoad }) {
    const [jsonData, setJsonData] = useState(null);

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
                setJsonData(jsonData);
                onLoad(jsonData);
            } catch (error) {
                console.error("Error parsing JSON:", error);   
            }
        };
        // ファイルをjsonとして読み込む
        reader.readAsText(file);
        // JSONパースして状態を設定
    }
    return (
        <div className="input-group">
            <span className="input-group-text">Input json file</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="form-control" placeholder="" />
        </div>
    );
}

export default StateJsonFileUploader;