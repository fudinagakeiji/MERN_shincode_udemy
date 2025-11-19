// ExpressのRouter機能を使ってサブルーターを生成する
const router = require("express").Router();

// express-validatorからチェーン用のbody関数と結果取得用のvalidationResultを取り出す
const { body } = require("express-validator");
// .envファイルに記載した環境変数をprocess.envへ読み込む
require("dotenv").config();

// ユーザースキーマ/モデルを読み込みAPIから使えるようにする
const User = require("../models/user");

// バリデーション結果を共通処理するミドルウェアを読み込む
const validation = require("../handlers/validation");

// ビジネスロジックをまとめたユーザーコントローラを読み込む
const userController = require("../controllers/user");

// JWT検証系のミドルウェア群を読み込む
const tokenHandler = require("../handlers/tokenHandlers");

// ユーザ新規登録API
// index.jsからルーティングを分離したため、appではなくrouterへハンドラを登録する
router.post(
  "/register",
  // ユーザ名の最小文字数を検証するバリデーションチェーン
  body("username")
    // usernameフィールドが8文字以上かチェックする
    .isLength({ min: 8 })
    // バリデーション失敗時に返すメッセージを定義
    .withMessage("ユーザ名は8文字以上である必要があります"),
  // パスワード用の長さバリデーション
  body("password")
    // passwordフィールドが8文字以上かチェックする
    .isLength({ min: 8 })
    // 失敗時にユーザへ伝えるメッセージを設定
    .withMessage("パスワードは8文字以上である必要があります"),
  // 確認用パスワードの長さバリデーション
  body("confirmPassword")
    // confirmPasswordフィールドが8文字以上かを検証
    .isLength({ min: 8 })
    // 失敗時のメッセージを定義
    .withMessage("確認用パスワードは8文字以上である必要があります"),
  // ユーザ名がすでにDBへ登録されていないかを独自チェック
  body("username").custom((value) => {
    // MongoDBから同じユーザ名のレコードを検索
    return User.findOne({ username: value }).then((user) => {
      // ユーザが存在していた場合はバリデーションを失敗させる
      if (user) {
        return Promise.reject("このユーザはすでに使われています");
      }
    });
  }),

  // 共通のバリデーションチェックミドルウェアを挟み込む
  validation.validate,
  // バリデーション通過後のユーザー登録をコントローラに委譲する
  userController.register
);

// ログイン用API
router.post(
  "/login",
  // ログイン時もユーザ名の長さを検証する
  body("username")
    // usernameが8文字以上かチェックする
    .isLength({ min: 8 })
    // 足りない場合のメッセージを設定
    .withMessage("ユーザ名は8文字以上である必要があります"),
  // パスワード長のバリデーションを追加
  body("password")
    // passwordが8文字以上か確認
    .isLength({ min: 8 })
    // 足りない場合のエラーメッセージを返す
    .withMessage("パスワードは8文字以上である必要があります"),
  // 上記バリデーション結果を共通ミドルウェアで判定する
  validation.validate,
  // 実際のログイン処理をユーザーコントローラへ委譲する
  userController.login
);

// JWT認証用API
router.post(
  "/verify-token",
  // リクエストヘッダー内のJWTを検証するミドルウェアを差し込む
  tokenHandler.verifyToken,
  // 検証済みユーザー情報をレスポンスとして返却する
  (req, res) => {
    return res.status(200).json({ user: req.user });
  }
);

// 作成したルーターを外部から利用できるようエクスポートする
module.exports = router;
