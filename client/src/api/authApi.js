// 共通axiosクライアントを読み込みAPI呼び出しを抽象化する
import axiosClient from "./axiosClient";

// 認証系エンドポイントをまとめたAPIラッパー
const authApi = {
  // 新規登録APIを呼び出すラッパー関数
  // 期待するparams: { username, password, confirmPassword }
  register: (params) => axiosClient.post("auth/register", params),

  // ログインAPIを呼び出してJWTを取得する
  // 期待するparams: { username, password }
  login: (params) => axiosClient.post("auth/login", params),

  // クライアントが保持しているJWTを検証する
  // リクエストボディは不要のため引数なしで呼び出す
  verifyToken: () => axiosClient.post("auth/verify-token"),
};

export default authApi;
