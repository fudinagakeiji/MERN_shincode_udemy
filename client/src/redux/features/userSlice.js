// ユーザーデータ用のスライスを生成するためcreateSliceを取り込む
import { createSlice } from "@reduxjs/toolkit";
// ログインユーザー情報を格納する初期ステート
const initialState = { value: {} };

// ユーザーの取得/更新を司るReduxスライス
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // APIから受け取ったユーザー情報をステートへ保存
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

// アクションとリデューサーを公開
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
