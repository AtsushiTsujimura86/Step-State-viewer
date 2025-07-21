import React, { useEffect, useLayoutEffect, useState } from 'react';
import mermaid from 'mermaid';
import getStateMachineHtml from '../logic/stateJsonHandler';

function MermaidChart({ currentState, stateJson }) {
  const [svg, setSvg] = useState('');
  const [mermaidString, setMermaidString] = useState('');

  useEffect(()=>{
    if (stateJson) {
      const mermaidHtml = getStateMachineHtml(stateJson);
      setMermaidString(mermaidHtml);
      console.log("Mermaid String:", mermaidHtml  );
    }
  }, [stateJson])

  // Mermaid構文を生成
  const generateMermaid = () => {
    console.log('Generating Mermaid diagram...');
    return `${mermaidString}`;
  }

  useLayoutEffect(() => {
    const id = 'mermaid-' + Math.floor(Math.random() * 100000);
    mermaid.initialize({ startOnLoad: false });

    mermaid.render(id, generateMermaid())
      .then(({ svg }) => setSvg(svg))
      .catch(err => setSvg(`<pre style="color:red">${err.message}</pre>`));
  }, [currentState, mermaidString]);

  return (
    <div style={{ minHeight: '300px' }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default MermaidChart;
