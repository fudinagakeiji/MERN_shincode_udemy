// MongoDB操作用ライブラリのMongoose本体を読み込む
const mongoose = require("mongoose");
// ユーザー情報を保存するためのスキーマ定義を作成する
const userSchema = new mongoose.Schema({
  // ユーザー名フィールドの構造と制約を定義
  username: {
    // ユーザー名は文字列型に限定する
    type: String,
    // ユーザー名の入力を必須にする
    required: true,
    // 同じユーザー名を重複登録できないようにする
    unique: true,
  },
  // パスワードフィールドの構造と制約を定義
  password: {
    // パスワードも文字列型とする
    type: String,
    // パスワードの入力を必須にする
    required: true,
  },
});

// 定義したスキーマを使ってUserモデルを作成し外部へ公開
module.exports = mongoose.model("User", userSchema);
