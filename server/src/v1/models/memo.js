// MongoDB操作用ライブラリのMongoose本体を読み込む
const mongoose = require("mongoose");
// ユーザー情報を保存するためのスキーマ定義を作成する
const Schema = mongoose.Schema;
// ユーザーごとのメモ情報を表現するスキーマ
const memoSchema = new Schema({
  // どのユーザーが作成したかを記録
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // メモ一覧に表示する絵文字アイコン
  icon: {
    type: String,
    default: "📝",
  },
  // メモタイトル
  title: {
    type: String,
    default: "無題",
  },
  // メモ概要
  description: {
    type: String,
    default: "ここに自由に記入してください",
  },
  // 一覧における並び順
  position: {
    type: Number,
  },
  // お気に入り登録されているかどうか
  favorite: {
    type: Boolean,
    default: false,
  },
  // お気に入り欄での並び順
  faboritePosition: {
    type: Number,
    default: 0,
  },
});

// 定義したスキーマを使ってUserモデルを作成し外部へ公開
module.exports = mongoose.model("Memo", memoSchema);
