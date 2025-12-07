// 絵文字表示領域とラベルを描画するためのMUIコンポーネント
import { Box, Typography } from "@mui/material";
// 絵文字の選択状態や表示制御を管理するためのReactフック
import React, { useEffect, useState } from "react";
// emoji-mart v3のスタイルシートを読み込む
import "emoji-mart/css/emoji-mart.css";
// 実際の絵文字ピッカーUIを提供するコンポーネント
import { Picker } from "emoji-mart";

// 選択中の絵文字を表示し、クリックでピッカーを開くコンポーネント
const EmojiPicker = (props) => {
  // 現在選択されている絵文字をローカルステートで保持
  const [selectedEmoji, setSelectedEmoji] = useState();
  // ピッカー表示/非表示を制御するフラグ
  const [isShowPicker, setIsShowPicker] = useState();

  // 親から渡されたiconプロップが変わったらローカルステートへ反映
  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  // 絵文字アイコンをクリックした際にピッカーの表示状態を切り替える
  const showPicker = () => setIsShowPicker(!isShowPicker);

  // ピッカーで絵文字を選択した際にコードポイントを変換し親へ通知
  const selectEmoji = (e) => {
    console.log(e);
    const emojiCode = e.unified.split("-");
    let codesArray = [];
    emojiCode.forEach((el) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    console.log(emoji);
    setIsShowPicker(false);
    props.onChange(emoji);
  };
  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={showPicker}
      >
        {props.icon}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          zIndex: "100",
        }}
      >
        <Picker onSelect={selectEmoji} />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
