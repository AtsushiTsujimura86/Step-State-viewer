import React, { useEffect, useLayoutEffect, useState } from 'react';
import mermaid from 'mermaid';
import getMermaidString from '../logic/stateJsonHandler';

function MermaidChart({ currentState, stateJson }) {
  const [svg, setSvg] = useState('');
  const [mermaidString, setMermaidString] = useState('');

// マーメイド形式の文字列を生成
  useEffect(()=>{
    if (stateJson) {
      setMermaidString(getMermaidString(stateJson));
      setSvg(''); // Reset SVG when stateJson changes
    }
  }, [stateJson]);



  useLayoutEffect(() => {
    if (!currentState || !mermaidString) return;
    const id = 'mermaid-' + Math.floor(Math.random() * 100000);
    mermaid.initialize({ startOnLoad: false });

    mermaid.render(id, getMermaidString(stateJson, currentState))
      .then(({ svg }) => setSvg(svg))
      .catch(err => console.error('<Mermaid rendering error>:', err));
  }, [currentState, mermaidString]);


  return (
    <div style={{ minHeight: '300px' }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default MermaidChart;
