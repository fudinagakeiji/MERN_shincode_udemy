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
// ユーザーの全メモを取得して最新順に返却する
exports.getAll = async (req, res) => {
  // 並び替え用に総件数を取得（将来の利用を想定）
  const memoCount = await Memo.find().count();
  try {
    // ログインユーザーに紐づくメモをposition降順で取得
    const memos = await Memo.find({ user: req.user._id }).sort("-position");
    res.status(200).json(memos);
  } catch (err) {
    res.status(500).json(err);
  }
};

// 単一メモをID指定で取得する
exports.getOne = async (req, res) => {
  // ルートパラメータからメモIDを取得
  const { memoId } = req.params;
  try {
    // ユーザーIDとメモIDの両方が一致するメモを取得
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");
    res.status(200).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};

// メモ内容を更新する
exports.update = async (req, res) => {
  // パラメータからメモIDを取得
  const { memoId } = req.params;
  // リクエストボディのタイトルと説明を抽出
  const { title, description } = req.body;
  try {
    // 空文字の場合はデフォルト文言を再設定
    if (title === "") req.body.title = "無題";
    if (description === "")
      req.body.description = "ここに自由に記入してください";

    // 対象メモが存在するか検証
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");

    // 送信された内容でメモを更新
    const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
      $set: req.body,
    });
    res.status(200).json(updatedMemo);
  } catch (err) {
    res.status(500).json(err);
  }
};

// メモを削除する
exports.delete = async (req, res) => {
  // パラメータからメモIDを取得
  const { memoId } = req.params;
  try {
    // 対象メモが存在するか確認
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");

    // メモをDBから削除
    await Memo.deleteOne({ _id: memoId });
    res.status(200).json("メモを削除しました");
  } catch (err) {
    res.status(500).json(err);
  }
};
