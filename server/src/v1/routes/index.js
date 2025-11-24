// ExpressのRouterからサブルーターを生成する
const router = require("express").Router();

// /auth配下のルートはroutes/auth.jsへ委譲する
router.use("/auth", require("./auth"));

// 親アプリからこのルーターを使えるようエクスポート
module.exports = router;
