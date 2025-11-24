// 認証APIラッパーを利用してトークン検証を行う
import authApi from "../api/authApi";

// 認証状態チェック関連のユーティリティをまとめる
const authUtils = {
  // ローカルストレージのJWTを検証してログイン済みか判定する
  isAuthenticated: async () => {
    // 保存済みトークンを取得し、存在しなければ未認証扱い
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      // サーバーへ検証リクエストを送り、ユーザー情報を取得
      const res = await authApi.verifyToken();
      console.log(res, "authutils-res");

      // 正常に検証できた場合はユーザー情報を返す
      return res.user;
    } catch {
      // 例外時は未認証扱いにする
      return false;
    }
  },
};
export default authUtils;
