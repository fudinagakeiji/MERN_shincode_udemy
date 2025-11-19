// JWTの署名・検証を担うjsonwebtokenライブラリを読み込む
const JWT = require("jsonwebtoken");

// パスワード暗号化などに利用するcrypto-jsライブラリを読み込む
const CryptoJS = require("crypto-js");

// ユーザースキーマ/モデルを読み込みAPIから使えるようにする
const User = require("../models/user");

// ユーザ登録API
// ユーザー登録処理を担当する非同期コントローラを定義する
exports.register = async (req, res) => {
  // 送信されたリクエストボディから平文パスワードを抽出
  const password = req.body.password;

  // DB書き込みや暗号化で発生する可能性のあるエラーを捕捉する
  try {
    // 環境変数の秘密鍵を使ってパスワードをAES暗号化し、リクエストボディを書き換える
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
    // 暗号化済み情報をそのままMongoDB上に保存する
    const user = await User.create(req.body);

    // 登録したユーザーIDをペイロードに入れたJWTを発行し、24時間で期限切れに設定する
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
    // 保存したユーザー情報と発行したトークンをクライアントへ返す
    return res.status(200).json({ user, token });
    // 例外が発生した場合はこちらの処理が実行される
  } catch (error) {
    // エラー発生時に備えて例外情報を受け取り、後でレスポンスへ反映予定
    // 想定外の例外内容を500エラーとして返却する
    return res.status(500).json(error);
  }
};

// ユーザログインAPI
exports.login = async (req, res) => {
  // リクエストボディからユーザ名とパスワードを取得
  const { username, password } = req.body;

  // DB検索や認証処理で発生する例外を捕捉する
  try {
    // 送信されたユーザ名に一致するユーザー情報を検索
    const user = await User.findOne({ username: username });

    // ユーザーが存在しない場合は401エラーを返却
    if (!user) {
      return res.status(401).json({
        erros: {
          param: "username",
          message: "ユーザ名が無効です",
        },
      });
    }
    // この先でパスワード照合やトークン発行を実装予定

    // 保存していた暗号化済みパスワードを復号して平文に戻す
    const descriptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    // 入力されたパスワードと復号結果が一致しない場合は401を返す
    if (descriptedPassword !== password) {
      return res.status(401).json({
        erros: {
          param: "username",
          message: "パスワードが無効です",
        },
      });
    }

    // 認証が成功したらJWTを生成してレスポンスに含める
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });

    // 正常ログイン時はユーザ情報とトークンをクライアントへ返却
    return res.status(201).json({ user, token });

    // 想定外の例外発生時はこちらが実行される
  } catch (err) {
    // エラー内容を500ステータスでクライアントへ通知
    return res.status(500).json(err);
  }
};
