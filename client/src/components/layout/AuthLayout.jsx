// ページのレイアウト用にMUIのBoxコンポーネントを読み込む
import { Box } from "@mui/material";
// 幅制限と中央寄せに使うコンテナを読み込む
import { Container } from "@mui/system";
// React本体を読み込む
import React, { useEffect } from "react";
// ネストされたルートを描画するためのOutletを読み込む
import { Outlet, useNavigate } from "react-router-dom";
// ロゴ画像を読み込んで表示に利用する
import notionLogo from "../../assets/images/notion-logo.png";
import authUtils from "../../utils/authUtils";
const AuthLayout = () => {
  // ログイン済みかを判定してリダイレクトするためのnavigate
  const navigate = useNavigate();
  useEffect(() => {
    // 初回マウント時にログイン状態を確認する
    const checkAuth = async () => {
      // JWT検証を行い認証済みならtrueが返る
      const isAuth = await authUtils.isAuthenticated();
      if (isAuth) {
        // すでに認証済みならトップに戻す
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    <div>
      {/* 認証ページの共通枠を中央寄せのコンテナで構成 */}
      <Container component="main" maxWidth="xs">
        {/* ロゴとタイトルを縦並びで配置 */}
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* サイトロゴを表示 */}
          <img
            src={notionLogo}
            style={{ width: 100, height: 100, marginBottom: 3 }}
          />
          {/* 次に実際のタイトルを表示 */}
          Notionクローン開発
        </Box>
        {/* 子ルートで定義したページコンポーネントを差し込む */}
        <Outlet />
      </Container>
    </div>
  );
};

export default AuthLayout;
