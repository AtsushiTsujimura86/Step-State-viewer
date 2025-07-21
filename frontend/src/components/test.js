import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

function MermaidChart({ currentState }) {
  const containerRef = useRef(null);
  const graphId = useRef('mermaid-' + Math.floor(Math.random() * 100000));
  // const [currentState, setCurrentState] = useState('IDLE');

  const states = ['IDLE', 'TX', 'RX'];

  // 状態を1秒ごとに更新
  // useEffect(() => {
  //   let index = 0;
  //   const timer = setInterval(() => {
  //     index = (index + 1) % states.length;
  //     setCurrentState(states[index]);
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);

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
  };

  // Mermaid描画
  useEffect(() => {
    if (!containerRef.current) return;

    mermaid.initialize({ startOnLoad: false });
    containerRef.current.innerHTML = '';
    mermaid.render(graphId.current, generateMermaid())
      .then(({ svg }) => {
        containerRef.current.innerHTML = svg;
        console.log('✅ Mermaid rendered successfully');
      })
      .catch(err => {
        containerRef.current.innerHTML = `<pre style="color:red">${err.message}</pre>`;
        console.error('❌ Mermaid render error:', err);
      });
  }, [currentState]); // ← 状態が変わるたびに再描画

  return (
    <div>
      {/* <h3>現在の状態：{currentState}</h3> */}
      <div ref={containerRef} style={{ minHeight: '300px' }} />
    </div>
  );
}

export default MermaidChart;
