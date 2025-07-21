import React, { useState, useEffect } from "react";
import { getStateLines } from "../logic/stateHandler";

function FileUploader({ onLoad }) {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if(!file) return;
        // ファイルリーダーを使用してファイルを読み込む
        const reader = new FileReader();
        // ファイル読み込み完了時の処理, addEventListenerみたいな
        reader.onload  = (event) => {
            const logText = event.target.result;
            console.log("File content:", logText);
            const stateLines = getStateLines(logText);
            onLoad(stateLines);
        };
        // ファイルをテキストとして読み込む
        reader.readAsText(file);
    }
    return (
        <div>
            <input type="file" accept=".txt" onChange={handleFileUpload} />;
        </div>
    );
}

export default FileUploader;