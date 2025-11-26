// MongoDB上のメモコレクションへアクセスするMongooseモデル
const Memo = require("../models/memo");

// 認証済みユーザー向けのメモ新規作成ロジック
exports.create = async (req, res) => {
  // 既存メモ数を取得し、新規メモの並び順に使う
  const memoCount = await Memo.find().count();
  try {
    // ユーザーIDと並び順だけを設定してメモを作成
    const memo = await Memo.create({
      user: req.user._id,
      position: memoCount > 0 ? memoCount : 0,
    });
    res.status(201).json(memo);
  } catch {
    // 予期しないエラーはサーバーエラーとして返す
    res.status(500).json(err);
  }
};
