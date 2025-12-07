// メモ一覧の状態を管理するためのcreateSliceを読み込む
import { createSlice } from "@reduxjs/toolkit";
// メモ配列を格納する初期ステート
const initialState = { value: [] };

// メモに関するReduxスライス定義
export const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    // メモ一覧を一括で更新するアクション
    setMemo: (state, action) => {
      state.value = action.payload;
    },
  },
});

// アクション/リデューサーをエクスポート
export const { setMemo } = memoSlice.actions;
export default memoSlice.reducer;
