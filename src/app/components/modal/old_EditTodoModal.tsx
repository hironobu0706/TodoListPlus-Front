"use client";

import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Modal from "react-modal";
import "./AddTodoModal.scss"

Modal.setAppElement("#todoApp");

const EditTodoModal = ({ editModalIsOpen, closeEditModal, id }) => {

    // 入力項目
    const [tag, setTag] = useState('');
    const [contents, setContents] = useState('');
    const [status, setStatus] = useState('');
    const [deadline, setDeadline] = useState('');

    const updateTodo = async () => {
        await axios.put(`http://localhost:8080/api/todolist/update`,
            {
                id,
                tag,
                contents,
                status,
                deadline
            });
        location.href="";
    }

    const loadTodo = async () => {
        const result = await axios.get(`http://localhost:8080/api/todolist/${id}`);
        setTag(result.data.tag);
        setContents(result.data.contents);
        setStatus(result.data.status);
        setDeadline(result.data.deadline);
    }

    // モーダルのスタイルを設定
    const modalStyle = {
        content: {
            width: '60%',
            height: '60%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <Modal
            isOpen={editModalIsOpen}
            onAfterOpen={() => {
                // モーダルが開いた後の処理
                loadTodo();
            }}
            onRequestClose={closeEditModal}
            style={modalStyle}
            contentLabel="Example Modal"
        >
            <div className="editTodoModalWrapper">
                <h1>Todoを編集</h1>
                <div>
                    <label htmlFor="Name">カテゴリ</label>
                    <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="Name">内容</label>
                    <input type="text" value={contents} onChange={(e) => setContents(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="Name">ステータス</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="0">未</option>
                        <option value="9">完了</option>
                    </select>
                    {/* <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} /> */}
                </div>
                <div>
                    <label htmlFor="Name">期日</label>
                    <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                </div>
                <br />
                <div>
                    <Button variant="contained" onClick={updateTodo}>更新</Button>
                    <Button variant="outlined" href="/">キャンセル</Button>
                </div>
            </div>
        </Modal>
    )
}

export default EditTodoModal;