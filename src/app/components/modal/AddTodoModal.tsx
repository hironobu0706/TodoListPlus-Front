// クライアントコンポーネント
"use client" // ←※※注意ポイント①※※
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from "react-modal";
// import Button from '@mui/material/Button';
import "./AddTodoModal.scss"
// import TextField from '@mui/material/TextField';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';

import {
    Select,
    MenuItem,
    // AppBar,             // 画面上部に固定されるヘッダー
    // Toolbar,            // ヘッダーの中の横並びレイアウト用
    Typography,         // 見出しや本文などのテキスト表示
    // Container,          // 中央寄せ＆余白ありの全体レイアウト枠
    TextField,          // 入力フォーム（名前・メールなど）
    Button,             // 押せるボタン（送信・閉じるなど）
    Grid,               // 要素を縦や横に並べるレイアウト
    // Card,               // 情報を囲って見せるパネル（カード）
    // CardContent,        // カード内に配置する中身
    Box,                // スタイル調整や余白をつけるための箱
    // Paper,              // 白背景＋影のついたパネル
    // Dialog,             // ポップアップウィンドウ（モーダル）
    // DialogTitle,        // モーダルのタイトル部分
    // DialogContent,      // モーダルの本文部分
    // DialogActions       // モーダルのボタン部分（閉じるなど）
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ja';
import dayjs from 'dayjs';

Modal.setAppElement("#todoApp");

const AddTodoModal = ({ addModalIsOpen, closeAddModal, id }) => {

    // 入力項目
    const [tag, setTag] = useState('');
    const [contents, setContents] = useState('');
    const [status, setStatus] = useState('0');
    const [deadline, setDeadline] = useState(dayjs().add(3, 'day'));

    useEffect(() => {
        setTag('');
        setContents('');
        setStatus('0');
        setDeadline(dayjs().add(3, 'day'));
    }, [id])

    const createTodo = async () => {
        await axios.post("http://localhost:8080/api/create",
            {
                tag,
                contents,
                status,
                deadline: deadline.format("YYYY-MM-DD")
            });
        location.href = "";
    }

    const updateTodo = async () => {
        await axios.put(`http://localhost:8080/api/todolist/update`,
            {
                id,
                tag,
                contents,
                status,
                deadline: deadline.format("YYYY-MM-DD")
            });
        location.href = "";
    }

    // モーダルのスタイルを設定
    const modalStyle = {
        content: {
            width: '60%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const loadTodo = async () => {
        const result = await axios.get(`http://localhost:8080/api/todolist/${id}`);
        setTag(result.data.tag);
        setContents(result.data.contents);
        setStatus(result.data.status);
        setDeadline(dayjs(result.data.deadline));
    }

    return (
        <Modal
            isOpen={addModalIsOpen}
            onAfterOpen={() => {
                if (id === '') {
                    return
                }
                // モーダルが開いた後の処理
                loadTodo();
            }}
            onRequestClose={closeAddModal}
            style={modalStyle}
            contentLabel="Example Modal"
        >
            {/* <Box component={Paper} elevation={3} p={4}> */}
            <Box>
                <Typography variant="h5" gutterBottom>
                    Todoを追加
                </Typography>

                {/* Grid：縦並びレイアウト */}
                <Grid container spacing={2} direction="column">
                    {/* カテゴリ */}
                    <Grid item>
                        <TextField id="outlined-basic" label="カテゴリ" fullWidth variant="outlined" value={tag} onChange={(e) => setTag(e.target.value)} />
                    </Grid>

                    {/* 内容 */}
                    <Grid item>
                        <TextField
                            label="内容"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={contents}
                            onChange={(e) => setContents(e.target.value)}
                        />
                    </Grid>

                    {/* ステータス */}
                    <Grid item>
                        {/* <InputLabel id="status-label">ステータス</InputLabel> */}
                        <Select
                            id="demo-simple-select"
                            value={status}
                            //  labelId="status-label"   // ← InputLabel と関連付ける
                            fullWidth
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="0">未</MenuItem>
                            <MenuItem value="9">完了</MenuItem>
                        </Select>
                    </Grid>

                    {/* 期日 */}
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ja'}>
                            <DatePicker
                                format="YYYY/MM/DD"
                                value={deadline}
                                onChange={(newValue) => setDeadline(newValue)} // ← state 更新
                            />
                        </LocalizationProvider>
                    </Grid>

                    {/* 送信ボタン */}
                    <Grid item>
                        {id ?
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={updateTodo}
                            >
                                更新
                            </Button>
                            :
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={createTodo}
                            >
                                登録
                            </Button>}
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" href="/">キャンセル</Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default AddTodoModal;