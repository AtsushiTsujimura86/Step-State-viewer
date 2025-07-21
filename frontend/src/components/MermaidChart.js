import React, { useLayoutEffect, useState } from 'react';
import mermaid from 'mermaid';

function MermaidChart({ currentState }) {
  const [svg, setSvg] = useState('');

  // Mermaid構文を生成
  const generateMermaid = () => {
    console.log('Generating Mermaid diagram...');
    return `
      stateDiagram-v2
        [*] --> IDLE
        IDLE --> TX : send
        TX --> RX : ack
        RX --> IDLE : done

        ${currentState === 'IDLE' ? 'style IDLE fill:#ffd,stroke:#f80,stroke-width:2px' : ''}
        ${currentState === 'TX'   ? 'style TX fill:#fdd,stroke:#f00,stroke-width:2px' : ''}
        ${currentState === 'RX'   ? 'style RX fill:#ddf,stroke:#00f,stroke-width:2px' : ''}
    `;
  }

  useLayoutEffect(() => {
    const id = 'mermaid-' + Math.floor(Math.random() * 100000);
    mermaid.initialize({ startOnLoad: false });

    mermaid.render(id, generateMermaid())
      .then(({ svg }) => setSvg(svg))
      .catch(err => setSvg(`<pre style="color:red">${err.message}</pre>`));
  }, [currentState]);

  return (
    <div style={{ minHeight: '300px' }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default MermaidChart;
