# Mermaid.js × Reactでの初期描画バグと解決策まとめ

---

## 1. 今回の現象

- **ReactでMermaid.jsの状態遷移図を描画する際、リロード直後や状態変化時に「SVGが空（ノード・エッジがない）」になる現象が発生**
    - 初回マウント時や、再描画タイミングでグラフが見えない・消える
    - ボタン操作や状態変更の後は正しく表示されることが多い

---

## 2. 原因

- **ReactとMermaidの「DOM管理方法の違い」による競合が原因**
    - Mermaidは直接DOMを書き換える（`element.innerHTML = svg`等）
    - Reactは状態やprops変化でコンポーネントごとにDOMを再構築・再レンダ
    - 再レンダのタイミングによっては**Mermaidが挿入したSVGが消されたり、描画が空になったりする**

---

## 3. `dangerouslySetInnerHTML`とは？

- **Reactが本来禁止している「HTMLやSVGの文字列をそのままDOMに挿入する」ためのプロパティ**
    - 通常の`<div>{htmlString}</div>`だと、文字列として解釈されHTMLタグは無効化される
    - `dangerouslySetInnerHTML={{ __html: svgString }}` を使うことで「HTML文字列を生DOM化」できる

- **dangerous（危険）な理由**
    - ユーザー入力や外部データをそのまま渡すと、XSS（クロスサイトスクリプティング）攻撃のリスクがある
    - **自分で生成したSVGや信頼できるソースのみで使うこと！**

```jsx
<div dangerouslySetInnerHTML={{ __html: svg }} />
```

---

## 4. 解決策（今回のベストプラクティス）

### A. Mermaidの描画結果（SVG文字列）をReactのstateで管理

1. MermaidでSVG文字列を生成
2. そのSVGをReactの`useState`で保持
3. `dangerouslySetInnerHTML`で描画

```jsx
const [svg, setSvg] = useState('');
useLayoutEffect(() => {
    mermaid.render('graphId', generateMermaid())
        .then(({ svg }) => setSvg(svg))
        .catch(err => setSvg(`<pre style="color:red">${err.message}</pre>`));
}, [currentState]);
return (
    <div dangerouslySetInnerHTML={{ __html: svg }} />
);
```

- **これにより、ReactのレンダリングとMermaid描画が完全に同期**
- DOMの競合や再レンダによるSVGの消失を防止できる

---

## 5. 一般性・再利用性

- **この現象と解決策は、外部ライブラリがDOMを書き換える系（Mermaid, Chart.js, など）では一般的によく発生し、世界中で同じ手法が使われている**
- React公式・GitHub・StackOverflowでも「SVG/HTML文字列をstateで管理し、dangerouslySetInnerHTMLで描画」がベストプラクティスとされる

---

## 6. まとめ

- React × Mermaid.jsの「初回描画が空になる」現象はDOM管理競合が原因
- MermaidのSVGを**文字列としてstate管理→dangerouslySetInnerHTMLで描画**が王道解決
- ユーザー入力や外部データには使わず、**信頼できるソースのみで使うこと**

---

### 【参考】
- [Why mermaid charts disappear in React and how to fix it](https://rendazhang.medium.com/why-mermaid-charts-disappear-in-react-and-how-to-fix-it-351545ef1ebc)
- [React公式：dangerouslySetInnerHTML](https://ja.react.dev/reference/react-dom/components/common#dangerouslysetinnerhtml)
