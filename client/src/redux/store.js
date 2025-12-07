// Redux Toolkitのstore生成関数を読み込む
import { configureStore } from "@reduxjs/toolkit";
// ユーザー情報を保持するスライスを取り込む
import userReducer from "./features/userSlice";
// メモ一覧を扱うスライスを取り込む
import memoReducer from "./features/memoSlice";

// アプリ全体で利用するReduxストアを作成してエクスポート
export const store = configureStore({
  reducer: {
    user: userReducer,
    memo: memoReducer,
  },
});
