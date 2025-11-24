// 入力フォームを構成するためのMUIコンポーネント群を読み込む
import { Box, Button, TextField } from "@mui/material";
// React本体を読み込む
import React, { useState } from "react";
// 送信ボタンにローディング演出を付けるコンポーネントを読み込む
import { LoadingButton } from "@mui/lab";
// 画面遷移リンクを描画するためのコンポーネントを読み込む
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
const Register = () => {
  // 送信完了後に遷移させるためのナビゲータ
  const navigate = useNavigate();
  // 各入力欄ごとのエラーメッセージを状態管理
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setpasswordErrText] = useState("");
  const [confirmErrText, setConfirmErrText] = useState("");
  // API処理中はボタンを無効化するためのフラグ
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 送信前に前回のエラーメッセージをリセット
    setUsernameErrText("");
    setpasswordErrText("");
    setConfirmErrText("");

    // form要素から入力値を抜き出す
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();
    console.log(username, password, confirmPassword);

    let error = false;
    if (username === "") {
      error = true;
      setUsernameErrText("名前を入力してください");
    }
    if (password === "") {
      error = true;
      setpasswordErrText("パスワードを入力してください");
    }
    if (confirmPassword === "") {
      error = true;
      setConfirmErrText("確認用パスワードを入力してください");
    }
    if (password !== confirmPassword) {
      error = true;
      setConfirmErrText("パスワードと確認用パスワードが異なります");
    }
    if (error) return;

    setLoading(true);
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      setLoading(false);
      // レスポンス本体に含まれるJWTを保存
      localStorage.setItem("token", res.token);
      console.log("新規登録に成功しました");
      navigate("/");
    } catch (err) {
      // サーバーからのバリデーションエラー配列を取得
      const errors = err?.data?.errors || err?.errors;
      console.log(errors);
      // エラーの対象フィールドごとにメッセージをセット
      errors?.forEach((err) => {
        if (err.param === "username") {
          setUsernameErrText(err.msg);
        }
        if (err.param === "password") {
          setpasswordErrText(err.msg);
        }
        if (err.param === "confirmPassword") {
          setConfirmErrText(err.msg);
        }
      });
      setLoading(false);
    }
  };
  return (
    <>
      {/* 新規登録用のフォームを構成 */}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {/* ユーザ名入力欄 */}
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
          helperText={usernameErrText}
          error={usernameErrText !== ""}
          disabled={loading}
        />
        {/* パスワード入力欄 */}
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required
          helperText={passwordErrText}
          error={passwordErrText !== ""}
          disabled={loading}
        />
        {/* 確認用パスワード入力欄 */}
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          type="password"
          required
          helperText={confirmErrText}
          error={confirmErrText !== ""}
          disabled={loading}
        />
        {/* 送信ボタン（非同期処理時にローディング表示可能） */}
        <LoadingButton
          sx={{
            mt: 3,
            mb: 2,
          }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          アカウント作成
        </LoadingButton>
      </Box>
      {/* ログインページへの遷移リンク */}
      <Button component={Link} to="/login">
        すでにアカウントを持っていますか？ログイン
      </Button>
    </>
  );
};

export default Register;
