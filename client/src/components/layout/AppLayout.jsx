// ページのレイアウト用にMUIのBoxコンポーネントを読み込む
import { Box } from "@mui/material";
// React本体を読み込む
import React, { useEffect } from "react";
// ネストされたルートを描画するためのOutletを読み込む
import { Outlet, useNavigate } from "react-router-dom";
// ロゴ画像を読み込んで表示に利用する
// JWT検証やログイン状態チェック用ユーティリティ
import authUtils from "../../utils/authUtils";
// 左側に表示するナビゲーションバー
import Sidebar from "../common/Sidebar";
// Reduxのアクションを呼び出すためにuseDispatchをインポート
import { useDispatch } from "react-redux";
// 検証済みユーザー情報をReduxへ保存するアクション
import { setUser } from "../../redux/features/userSlice";
// アプリ全体の共通レイアウトコンポーネント
const AppLayout = () => {
  // ログイン済みかを判定してリダイレクトするためのnavigate
  const navigate = useNavigate();
  // ユーザー情報をグローバルステートへ格納するためのdispatch
  const dispatch = useDispatch();

  useEffect(() => {
    // 初回マウント時にログイン状態を確認する

    const checkAuth = async () => {
      // JWT検証を行い認証済みならtrueが返る
      const user = await authUtils.isAuthenticated();
      if (!user) {
        // すでに認証済みならトップに戻す
        navigate("/");
      } else {
        // ユーザをグローバルで保存する
        dispatch(setUser(user));
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    // 左にサイドバー・右に各ページコンテンツを表示
    <Box sx={{ display: "flex" }}>
      {/* ナビゲーション兼メモ一覧 */}
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
