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
import { Link, useNavigate } from "react-router-dom";
// ユーザ情報をグローバルストアから取得
import { useSelector } from "react-redux";

// アプリ共通のサイドバーコンポーネント
const Sidebar = () => {
  // 画面遷移をさせるためのnavigate
  const navigate = useNavigate();
  // Reduxストアからログイン中のユーザーを取得
  const user = useSelector((state) => state.user.value);

  // ローカルに保持しているトークンを削除してログイン画面へ遷移
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
            <IconButton>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        {/* 仮のメモリンク */}
        <ListItemButton
          sx={{ pl: "20px" }}
          component={Link}
          to="/memo/yghaoiwluhga"
        >
          <Typography>📝仮置きのメモ</Typography>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
