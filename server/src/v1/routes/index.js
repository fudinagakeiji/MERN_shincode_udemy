// ExpressのRouterからサブルーターを生成する
const router = require("express").Router();

// /auth配下のルートはroutes/auth.jsへ委譲する
router.use("/auth", require("./auth"));

// /memo配下のルーティングはメモ専用のサブルーターへ分割
router.use("/memo", require("./memo"));

// 親アプリからこのルーターを使えるようエクスポート
module.exports = router;
