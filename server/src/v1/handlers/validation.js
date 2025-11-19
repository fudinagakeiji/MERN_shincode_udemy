// express-validatorからチェーン用のbody関数と結果取得用のvalidationResultを取り出す
const { validationResult } = require("express-validator");

// ルートで使い回すバリデーション結果チェック用ミドルウェアを公開する
exports.validate =
  // バリデーション結果をまとめて確認する共通ミドルウェア
  (req, res, next) => {
    // バリデーションで発生したエラーを抽出
    const errors = validationResult(req);
    // エラーが1件でもある場合は400でエラー内容を返却
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // 問題が無ければ次のミドルウェアへ制御を移す
    next();
  };
