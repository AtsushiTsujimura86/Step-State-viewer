import React, { useState, useEffect } from "react";

function StateLogViewwer({ logs, currentIndex }) {
    console.log("StateLogViewer logs:", logs);
  return (
    <div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {logs.map((line, index) => (
            <li key={index} style={{color: index === currentIndex ? "red" : "black"}}>{line}</li>
        ))}
      </ul>
    </div>
  );
}

export default StateLogViewwer;