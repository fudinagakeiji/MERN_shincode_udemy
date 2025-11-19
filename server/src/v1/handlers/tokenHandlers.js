// JWT署名の検証に使うjsonwebtokenを読み込む
const JWT = require("jsonwebtoken");
// トークンに紐づくユーザー情報を取得するためのモデルを読み込む
const User = require("../models/user");
// リクエストヘッダーのAuthorizationからJWTを取り出して検証するユーティリティ
const tokenDecode = (req) => {
  // Authorizationヘッダーを取得し、存在しなければundefinedのまま
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    // "Bearer xxx" 形式から実際のトークン部分だけを抽出
    const bearer = bearerHeader.split(" ")[1];
    try {
      // JWTを検証し、署名や有効期限が妥当ならデコード結果を返す
      const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
      return decodedToken;
    } catch {
      // 検証に失敗した場合はfalseを返す
      return false;
    }
  }
  // ヘッダー自体が無い場合もfalseを返す
  return false;
};

// 認証が必要なルートでJWTを検証するミドルウェア
exports.verifyToken = async (req, res, next) => {
  // ヘッダーからトークンを抜き出して検証する
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    // トークンに含まれるユーザーIDからDB上のユーザーを検索
    const user = await User.findById(tokenDecoded.id);
    if (!user) {
      // トークンはあるがユーザーが存在しない場合は401を返して終了
      return res.status(401).json("権限がありません");
    }
    // 検証済みユーザーをreqへ保持し、後続処理から参照できるようにする
    req.user = user;
    // 問題なければ次のミドルウェア/ハンドラへ進む
    next();
  } else {
    // トークンが無効・不在の場合は認証エラーを返して処理終了
    return res.status(401).json("権限がありません");
  }
};
