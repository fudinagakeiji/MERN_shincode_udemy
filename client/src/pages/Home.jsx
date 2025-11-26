// 最初のメモ作成ボタンとしてMUIのローディングボタンコンポーネントを使用
import { LoadingButton } from "@mui/lab";
// 画面のレイアウト調整にBoxコンポーネントを利用
import { Box } from "@mui/material";
// 状態管理を行うためにReactとuseStateフックを読み込む
import React, { useState } from "react";

// トップ画面を表すHomeコンポーネント
const Home = () => {
  // 非同期処理中のインジケータ表示切り替えに使うフラグ
  const [loading, setLoading] = useState(false);
  // メモ新規作成APIを叩く予定のプレースホルダー
  const createMemo = () => {};
  return (
    // 画面全体を中央揃えで配置する
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 最初のメモを作るためのボタン */}
      <LoadingButton
        variant="outlined"
        onClick={() => createMemo}
        loading={loading}
      >
        最初のメモを作成
      </LoadingButton>
    </Box>
  );
};

export default Home;
