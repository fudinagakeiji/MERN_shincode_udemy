// ExpressのRouterからメモ用のサブルーターを生成
const router = require("express").Router();
// メモ関連のビジネスロジックをまとめたコントローラ
const memoController = require("../controllers/memo");
// JWTを検証して認証を保証するミドルウェア
const tokenHandler = require("../handlers/tokenHandlers");

// メモを作成
router.post("/", tokenHandler.verifyToken, memoController.create);

// メモ一覧を取得
router.get("/", tokenHandler.verifyToken, memoController.getAll);

// 特定メモの取得
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne);

// メモ内容の更新
router.put("/:memoId", tokenHandler.verifyToken, memoController.update);

// メモ削除
router.delete("/:memoId", tokenHandler.verifyToken, memoController.delete);
module.exports = router;
