// ExpressのRouterからメモ用のサブルーターを生成
const router = require("express").Router();
// メモ関連のビジネスロジックをまとめたコントローラ
const memoController = require("../controllers/memo");
// JWTを検証して認証を保証するミドルウェア
const tokenHandler = require("../handlers/tokenHandlers");

// メモを作成
router.post("/", tokenHandler.verifyToken, memoController.create);

module.exports = router;
