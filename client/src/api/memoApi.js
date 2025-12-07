// メモ関連APIを叩くための共通axiosインスタンス
import axiosClient from "./axiosClient";

// バックエンドのメモエンドポイントをまとめたAPIクライアント
const memoApi = {
  // メモ新規作成API
  create: () => axiosClient.post("memo"),
  // ログインユーザーの全メモ取得API
  getAll: () => axiosClient.get("memo"),
  // 特定メモをID指定で取得するAPI
  getOne: (id) => axiosClient.get(`memo/${id}`),
  // メモ内容を更新するAPI
  update: (id, params) => axiosClient.put(`memo/${id}`, params),
  // メモを削除するAPI
  delete: (id) => axiosClient.delete(`memo/${id}`),
};

export default memoApi;
