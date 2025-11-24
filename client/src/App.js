// グローバルスタイルを適用するCSSを読み込む
import "./App.css";
// ルーティング関連のコンポーネントを取り込む
import { BrowserRouter, Routes, Route } from "react-router-dom";
// 認証ページの共通レイアウトを読み込む
import AuthLayout from "./components/layout/AuthLayout";
// デフォルトのMUIスタイルリセットを適用するコンポーネントを読み込む
import CssBaseline from "@mui/material/CssBaseline";
// テーマ作成とテーマ適用用のMUIユーティリティを読み込む
import { createTheme, ThemeProvider } from "@mui/material";
// ログインページコンポーネントを読み込む
import Login from "./pages/Login";
// 新規登録ページコンポーネントを読み込む
import Register from "./pages/Register";
function App() {
  // アプリ全体で利用するカスタムMUIテーマを定義する
  const theme = createTheme({
    // プライマリカラーを指定してブランドカラーとして扱う
    palette: {
      primary: { main: "#1976d2" },
    },
  });
  return (
    // 作成したテーマを全コンポーネントに提供する
    <ThemeProvider theme={theme}>
      {/* ブラウザごとのスタイル差異をリセット */}
      <CssBaseline />
      {/* クライアントサイドルーティングを有効化 */}
      <BrowserRouter>
        <Routes>
          {/* 認証系レイアウトにネストしたルートを定義 */}
          <Route path="/" element={<AuthLayout />}>
            {/* /login でログイン画面を表示 */}
            <Route path="/login" element={<Login />} />
            {/* /register で登録画面を表示 */}
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
