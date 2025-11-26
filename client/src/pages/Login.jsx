// 入力フォームを構成するためのMUIコンポーネント群を読み込む
import { Box, Button, TextField } from "@mui/material";
// React本体を読み込む
import React, { useState } from "react";
// 送信ボタンにローディング演出を付けるコンポーネントを読み込む
import { LoadingButton } from "@mui/lab";
// 画面遷移リンクを描画するためのコンポーネントを読み込む
import { Link, useNavigate } from "react-router-dom";
// 認証API呼び出し用のラッパー
import authApi from "../api/authApi";
const Register = () => {
  // 認証後の画面遷移に利用する
  const navigate = useNavigate();
  // フォーム入力のエラー文言を保持
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setpasswordErrText] = useState("");
  // ログイン処理中の状態を保持してボタン制御に利用
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 送信前に前回のエラーメッセージをリセット
    setUsernameErrText("");
    setpasswordErrText("");

    // フォームから現在の入力値を抽出
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    console.log(username, password);

    let error = false;
    if (username === "") {
      error = true;
      setUsernameErrText("名前を入力してください");
    }
    if (password === "") {
      error = true;
      setpasswordErrText("パスワードを入力してください");
    }
    if (error) return;

    setLoading(true);
    try {
      // 入力値を渡してログインAPIを呼び出す
      const res = await authApi.login({
        username,
        password,
      });
      console.log(res);

      setLoading(false);
      // ログイン成功時のJWTを保存し、以降のAPIで利用
      localStorage.setItem("token", res.data.token);
      console.log("ログインに成功しました");
      navigate("/");
    } catch (err) {
      // サーバーから返されたバリデーションエラーを抽出
      // サーバーからのエラー配列を安全に取り出す
      const errors = err?.data?.errors || err?.errors;
      console.log(errors);
      errors?.forEach((err) => {
        // 入力欄ごとにエラーメッセージを反映
        if (err.param === "username") {
          setUsernameErrText(err.msg);
        }
        if (err.param === "password") {
          setpasswordErrText(err.msg);
        }
      });
      setLoading(false);
    }
  };
  return (
    <>
      {/* ログイン用のフォームを構成 */}
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
          ログイン
        </LoadingButton>
      </Box>
      {/* ログインページへの遷移リンク */}
      <Button component={Link} to="/register">
        アカウントを持っていませんか？新規登録
      </Button>
    </>
  );
};

export default Register;
