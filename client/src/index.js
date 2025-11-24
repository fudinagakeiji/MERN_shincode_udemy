// React本体を読み込みJSXを扱えるようにする
import React from "react";
// ブラウザDOMへ描画するためのReactDOMを読み込む
import ReactDOM from "react-dom";
// アプリ全体に適用するCSSを読み込む
import "./index.css";
// ルートコンポーネントを読み込む
import App from "./App";
// StrictModeでアプリ全体をラップしつつroot要素へ描画する
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
