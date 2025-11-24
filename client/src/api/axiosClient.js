// HTTP通信に利用するaxios本体を読み込む
import axios from "axios";

// バックエンドサーバーのベースURLを定義
const BASE_URL = "http://localhost:5003/api/v1";
// ローカルストレージから保存済みトークンを取得するヘルパー
const getToken = () => localStorage.getItem("token");
// 共通設定を持つaxiosインスタンスを作成
const axiosClient = axios.create({
  baseURL: BASE_URL,
});

// リクエスト送信前に認証ヘッダーなどを差し込む
axiosClient.interceptors.request.use(async (config) => {
  return {
    // JSON送信を明示し、必要ならBearerトークンを添付
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  };
});

// 共通のレスポンスエラーハンドリングを定義
axiosClient.interceptors.response.use(
  (response) => {
    // 正常時はそのまま呼び出し元へ返す
    return response;
  },
  (err) => {
    // エラー時はレスポンスオブジェクトを返して呼び出し元で扱いやすくする
    throw err.response;
  }
);

export default axiosClient;
