import axios, { AxiosError } from 'axios';
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
// import todoStore from "../stores/todoStore";
import { useNavigate } from "react-router-dom"
import type { CreateCustomerResponse } from '../../types/commonResponse';

export default function Login() {

    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [mailAddress, setMailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");

    const [userNameErrorMessage, setUserNameErrorMessage] = useState("");
    const [mailAddressErrorMessage, setMailAddressErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [passwordConfErrorMessage, setPasswordConfErrorMessage] = useState("");
    const [signinErrorMessage, setSigninErrorMessage] = useState("");

    // ユーザー名変更時の関数
    const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        // エラーメッセージの初期化
        setUserNameErrorMessage("");
        setUserName(e.target.value);
        if (e.target.value.length === 0) {
            setUserNameErrorMessage("ユーザー名を入力してください");
            return
        }
    };

    // メールアドレス変更時の関数
    const onChangeMailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        // エラーメッセージの初期化
        setPasswordErrorMessage("");
        setPasswordConfErrorMessage("")
        setPassword(e.target.value);
        if (e.target.value.length === 0) {
            setPasswordErrorMessage("パスワードを入力してください");
            return
        }
        if (e.target.value !== passwordConf) {
            setPasswordConfErrorMessage("パスワードと確認用のパスワードが一致しません");
            return
        }
        // checkNextButtonDisabled();
    };

    // パスワード確認用変更時の関数
    const onChangePasswordConf = (e: React.ChangeEvent<HTMLInputElement>) => {
        // エラーメッセージの初期化
        setPasswordConfErrorMessage("");
        setPasswordConf(e.target.value);
        if (e.target.value.length === 0) {
            setPasswordConfErrorMessage("パスワード確認用を入力してください");
            return
        }
        if (e.target.value !== password) {
            setPasswordConfErrorMessage("パスワードと確認用のパスワードが一致しません");
            return
        }
        // checkNextButtonDisabled();
    };

    // 次へボタンの活性/非活性を判定するための変数
    const isNextButtonDisabled = Boolean(
        // 未入力の項目がある場合は非活性にする
        !userName ||
        !mailAddress ||
        !password ||
        !passwordConf ||
        // エラーメッセージがある場合も非活性にする
        userNameErrorMessage ||
        mailAddressErrorMessage ||
        passwordErrorMessage ||
        passwordConfErrorMessage
    );

    // pinia(store)のセッター
    // const setUserId = todoStore((store) => store.setUserId);
    // const setUserName = todoStore((store) => store.setUserName);

    // 次へボタン押下時の関数
    const onNextButton = async () => {
        // エラーメッセージの初期化
        setSigninErrorMessage("");
        let response

        // 開発者用バックドア
        // if (mailAddress === "a@a.a" && password === "password") {
        //     navigate('/todoList');
        // }
        try {
            // http://localhost:8080/api/createCustomer
            response = await axios.post<CreateCustomerResponse>(`${import.meta.env.VITE_APP_BASE_URL}/api/createCustomer`,
                {
                    mailAddress,
                    password,
                    userName
                });
        } catch (error) {
            if (axios.isAxiosError<CreateCustomerResponse>(error)) {
                if (error.response) {
                    console.log("error.response:", error.response)
                    setSigninErrorMessage(
                        "エラーが発生しました。"
                        // error.response.data.message ?? ""
                    )
                } else {
                    setSigninErrorMessage("通信エラー")
                }
                return
            }
            setSigninErrorMessage("予期しないエラー")
        }
        console.log("response?.data", response?.data)
        navigate('/login');
        // レスポンスの内容に応じてログイン判定を行う
        // if (response?.data === "") {
        //     setSigninErrorMessage("ログインに失敗しました。メールアドレスとパスワードを確認してください。");
        // } else {
        //     // setLoginToken(response.data.token);
        //     // setUserName(response?.data.user_name);
        //     // setUserId(response?.data.user_id);
        //     navigate('/todoList');
        // }
    }

    return (
        <div className="container">
            <div className="login-container">
                <h1>アカウント作成</h1>
                {signinErrorMessage && (
                    <Box className="error-message">{signinErrorMessage}</Box>
                )}

                <Box ml={7}>
                    <Box mt={2}>
                        <label htmlFor="name">ユーザー名</label>
                        <TextField
                            sx={{ display: "flex" }}
                            placeholder="ユーザー名"
                            name="userName"
                            value={userName}
                            onChange={onChangeUserName}
                        />
                        {userNameErrorMessage && (
                            <Box className="error-message">{userNameErrorMessage}</Box>
                        )}
                    </Box>

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

                    <Box mt={2}>
                        <label htmlFor="name">パスワード確認用</label>
                        <TextField
                            sx={{ display: "flex" }}
                            placeholder=""
                            name="passwordConf"
                            type="password"
                            value={passwordConf}
                            onChange={onChangePasswordConf}
                        />
                        {passwordConfErrorMessage && (
                            <Box className="error-message">{passwordConfErrorMessage}</Box>
                        )}
                    </Box>

                    <Box mt={5}>
                        <div className="buttonContainer">
                            <Button
                                variant="contained"
                                className="nextButton"
                                onClick={onNextButton}
                                disabled={isNextButtonDisabled}>
                                アカウント作成
                            </Button>
                        </div>
                    </Box>
                </Box>
            </div>
        </div>
    );
}
