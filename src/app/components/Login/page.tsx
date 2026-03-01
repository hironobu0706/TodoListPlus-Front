// クライアントコンポーネント
"use client" // ←※※注意ポイント①※※

import axios from 'axios';
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import todoStore from "../../stores/todoStore";

export default function Login() {

    const router = useRouter();

    const [mailAddress, setMailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [mailAddressErrorMessage, setMailAddressErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [loginErrorMessage, setLoginErrorMessage] = useState("");

    // メールアドレス変更時の関数
    const onChangeMailAddress = (e: ChangeEvent<HTMLInputElement>) => {
        // エラーメッセージの初期化
        setMailAddressErrorMessage("");
        setMailAddress(e.target.value);
        if (e.target.value.length === 0) {
            setMailAddressErrorMessage("メールアドレスを入力してください");
            return
        }
        // checkNextButtonDisabled();
    };

    // パスワード変更時の関数
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        // エラーメッセージの初期化
        setPasswordErrorMessage("");
        setPassword(e.target.value);
        if (e.target.value.length === 0) {
            setPasswordErrorMessage("パスワードを入力してください");
            return
        }
        // checkNextButtonDisabled();
    };

    // 次へボタンの活性/非活性を判定するための変数
    const isNextButtonDisabled = Boolean(
        // 未入力の項目がある場合は非活性にする
        !mailAddress ||
        !password ||
        // エラーメッセージがある場合も非活性にする
        mailAddressErrorMessage ||
        passwordErrorMessage
    );

    const setUserId = todoStore((store) => store.setUserId);
    
    
    // 次へボタン押下時の関数
    const onNextButton = async () => {
        let response = null;
        // エラーメッセージの初期化
        setLoginErrorMessage("");
        try {
            response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/api/loginAuth`,
                {
                    mailAddress,
                    password
                });
        } catch (error) {
            console.error('Error:', error.response?.status, error.response?.statusText);
        }
        // レスポンスの内容に応じてログイン判定を行う
        if (response.data === "") {
            setLoginErrorMessage("ログインに失敗しました。メールアドレスとパスワードを確認してください。");
        } else {
            // setLoginToken(response.data.token);
            setUserId(response.data.user_id);
            router.push('/components/Todo');
        }
    }

    return (
        <div className="container">
            <div className="login-container">
                <h1>ログイン</h1>
                {loginErrorMessage && (
                    <Box className="error-message">{loginErrorMessage}</Box>
                )}

                <Box ml={7}>
                    <Box mt={2}>
                        <label htmlFor="name">メールアドレス</label>
                        <TextField
                            sx={{ display: "flex" }}
                            placeholder="sample@example.com"
                            name="mailAddress"
                            value={mailAddress}
                            onChange={onChangeMailAddress}
                        />
                        {mailAddressErrorMessage && (
                            <Box className="error-message">{mailAddressErrorMessage}</Box>
                        )}
                    </Box>

                    <Box mt={2}>
                        <label htmlFor="name">パスワード</label>
                        <TextField
                            sx={{ display: "flex" }}
                            placeholder=""
                            name="password"
                            type="password"
                            value={password}
                            onChange={onChangePassword}
                        />
                        {passwordErrorMessage && (
                            <Box className="error-message">{passwordErrorMessage}</Box>
                        )}
                    </Box>

                    <Box mt={5}>
                        <div className="buttonContainer">
                            <Button
                                variant="contained"
                                className="nextButton"
                                onClick={onNextButton}
                                disabled={isNextButtonDisabled}>
                                ログイン
                            </Button>
                        </div>
                    </Box>
                </Box>
            </div>
        </div>
    );
}
