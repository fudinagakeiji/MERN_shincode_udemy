// Expressモジュールを読み込んで利用できるようにする
const express = require("express");

// MongoDBとやりとりするためのMongooseを読み込む
const mongoose = require("mongoose");
// クエリ実行時に定義されていないフィールドを弾く設定を有効化
mongoose.set("strictQuery", true);

// Webアプリケーション本体となるExpressアプリを作成
const app = express();
// サーバーが待ち受けるポート番号を指定
const PORT = 5003;
// .envファイルに記載した環境変数をprocess.envへ読み込む
require("dotenv").config();
// DB接続
// DB接続処理でエラーが出てもアプリが落ちないようにtry/catchで囲む
try {
  // MongoDB Atlasの特定クラスタに接続する
  mongoose.connect(process.env.MONGO_URL);
  // 接続試行が実行されたタイミングでログを表示
  console.log("DBと接続中");
} catch (error) {
  // 例外発生時の情報をコンソールに出力
  console.log(error);
}

// // ルートにアクセスしたクライアントへ文字列を返すルートハンドラー
// app.get("/", (req, res) => {
//   res.send("HELLO EXPRESS");
// });
// 指定したポートでサーバーを起動し、起動時にログを表示
// 指定されたポートでサーバーを立ち上げ、起動完了時に実行されるコールバックを登録
app.listen(PORT, () => {
  // サーバーが立ち上がったことをコンソールで確認できるようにする
  console.log("ろーかるさーば起動中");
});
