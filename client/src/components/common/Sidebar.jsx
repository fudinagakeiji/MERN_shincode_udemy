// サイドバー表示に必要なMUIコンポーネントをまとめて読み込む
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
// ログアウトボタンに使用するアイコン
import LogoutIcon from "@mui/icons-material/Logout";
// メモ追加トリガーに利用するプラスアイコン
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
// カラーパレットなどの共通アセット
import assets from "../../assets/index";
// ログアウト後の遷移やメモリンク生成に使う
import { Link, useNavigate, useParams } from "react-router-dom";
// ユーザ情報をグローバルストアから取得
import { useDispatch, useSelector } from "react-redux";
// メモリスト取得とアクティブ状態管理に使うReactフック
import { useEffect, useState } from "react";
// メモ関連APIクライアント
import memoApi from "../../api/memoApi";
// 取得したメモ一覧をReduxへ保存するアクション
import { setMemo } from "../../redux/features/memoSlice";

// アプリ共通のサイドバーコンポーネント
const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // Reduxへアクションを送るためのdispatch
  const dispatch = useDispatch();
  // 画面遷移をさせるためのnavigate
  const navigate = useNavigate();
  // URLから現在表示すべきmemoIdを取得
  const { memoId } = useParams();
  // Reduxストアからログイン中のユーザーを取得
  const user = useSelector((state) => state.user.value);

  // Reduxから全メモ一覧を取得
  const memos = useSelector((state) => state.memo.value);
  // ローカルに保持しているトークンを削除してログイン画面へ遷移
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 初回レンダリング時にメモ一覧をAPIから取得
  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        dispatch(setMemo(res.data));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, [dispatch]);

  // URLパラメータやメモ一覧の変化に応じて選択状態を更新
  useEffect(() => {
    const activeIndex = memos.findIndex((e) => e._id === memoId);
    setActiveIndex(activeIndex);
  }, [memoId, memos]);

  // メモ追加ボタン押下時に新規メモを作成し一覧へ反映
  const addMemo = async () => {
    try {
      const res = await memoApi.create();
      const memo = res.data;
      const newMemos = [memo, ...memos];
      dispatch(setMemo(newMemos));
      navigate(`memo/${memo._id}`);
    } catch (error) {
      alert(error);
    }
  };
  return (
    // 常時表示されるドロワー（固定幅250px）
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: "100vh" }}
    >
      {/* サイドバー内に表示するリスト本体 */}
      <List
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        {/* ユーザー名とログアウトボタン */}
        <ListItemButton>
          <Box
            sx={{
              width: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onClick={logout}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton>
              <LogoutIcon />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }} />
        {/* お気に入りセクション */}
        <ListItemButton>
          <Box
            sx={{
              width: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
            <IconButton></IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }} />
        {/* プライベートセクションとメモ追加ボタン */}
        <ListItemButton>
          <Box
            sx={{
              width: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              プライベート
            </Typography>
            <IconButton onClick={() => addMemo()}>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        {/* DBから取得したメモを一覧表示 */}
        {memos.map((item, index) => (
          <ListItemButton
            sx={{ pl: "20px" }}
            component={Link}
            to={`/memo/${item._id}`}
            key={item._id}
            selected={index === activeIndex}
          >
            <Typography>
              {item.icon}
              {item.title}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
