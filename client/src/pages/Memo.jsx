// ページ全体の枠組みに使うMUIコンポーネント
import { Box } from "@mui/material";
import { IconButton, TextField } from "@mui/material";
// アイコン表示用のMUIアイコン群
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
// URLパラメータからmemoIdを取得する
import { useNavigate, useParams } from "react-router-dom";
// 入力値をローカル状態で保持しAPI同期する
import { useEffect, useState } from "react";
// メモの取得・更新APIを呼び出す
import memoApi from "../api/memoApi";
// メモ削除後に一覧を更新するためReduxを利用
import { useDispatch, useSelector } from "react-redux";
import { setMemo } from "../redux/features/memoSlice";
// 単一メモを表示・編集するページコンポーネント
const Memo = () => {
  // URLの:memoId パラメータを取得
  const { memoId } = useParams();
  // タイトルと本文の入力状態
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Reduxのdispatch関数
  const dispatch = useDispatch();
  // ストア上に保持されている全メモ一覧
  const memos = useSelector((state) => state.memo.value);
  // 削除後の遷移先決定に使うnavigate
  const navigate = useNavigate();
  // 指定IDのメモを読み込む
  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        setTitle(res.data.title);
        setDescription(res.data.description);
      } catch (error) {
        alert(error);
      }
    };
    getMemo();
  }, [memoId]);

  // 入力のデバウンス用途のタイマー
  let timer;
  const timeout = 500;

  // タイトル欄の入力をデバウンスしつつ更新APIを呼ぶ
  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);
    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { title: newTitle });
      } catch (error) {
        alert(error);
      }
    }, timeout);
  };

  // 本文欄の入力をデバウンスしながら更新APIを呼ぶ
  const updateDescription = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);
    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { description: newDescription });
      } catch (error) {
        alert(error);
      }
    }, timeout);
  };

  // 現在表示中のメモを削除し、一覧とルーティングを更新する
  const deleteMemo = async () => {
    try {
      const deleteMemo = await memoApi.delete(memoId);
      console.log(deleteMemo);
      // 削除対象を除いた新しいメモ一覧を生成
      const newMemos = memos.filter((e) => e._id !== memoId);

      if (newMemos.length === 0) {
        // すべて削除された場合はプレースホルダーへ遷移
        navigate("/memo");
      } else {
        // まだ残っていれば先頭のメモを表示
        navigate(`/memo/${newMemos[0]._id}`);
      }
      // Reduxストア側のメモ一覧も更新
      dispatch(setMemo(newMemos));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {/* ヘッダー部分：お気に入り・削除ボタン */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton variant="outlined" color="error" onClick={deleteMemo}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      {/* フォーム部分：タイトルと本文を入力 */}
      <Box sx={{ padding: "10px,50px" }}>
        <TextField
          value={title}
          placeholder="無題"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" },
          }}
          onChange={updateTitle}
        />
        <TextField
          value={description}
          placeholder="追加"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiOutlinedInput-root": { fontSize: "1rem" },
          }}
          onChange={updateDescription}
        />
      </Box>
    </>
  );
};

export default Memo;
