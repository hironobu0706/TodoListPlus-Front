// クライアントコンポーネント
"use client" // ←※※注意ポイント①※※

// 必要なライブラリとコンポーネントをインポート
import React, { useEffect, useState } from 'react';
// import TodoRow from './TodoRow';
// import TodoAdd from './TodoAdd';
import axios from 'axios';
import { TodoItemInterface } from '../types/types'
import Button from '@mui/material/Button';
// import Link from "next/link";
import { sortTable } from '../util/sortTable';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// modal
import AddTodoModal from './modal/AddTodoModal';
// import EditTodoModal from './modal/old_EditTodoModal';

const TodoList = () => {
    // タスクと新しいタスク入力を管理するためのuseState
    const [tasks, setTasks] = useState<TodoItemInterface[]>([]); // ←※※注意ポイント②※※
    const [tmpEditId, setTmpEditId] = useState<string>("");

    useEffect(() => {
        loadTodos();
    }, [])

    const loadTodos = async () => {
        try {
            const result = await axios.get("http://localhost:8080/api/getAllTodolist");
            setTasks(result.data);
        } catch (e) {
            console.log(e);
            // サンプルデータ
            const sampleData: TodoItemInterface = {
                id: 999,
                tag: 'タグ',
                contents: 'サンプルデータ',
                status: 0,
                deadline: '2025-01-01'
            }
            setTasks([sampleData]);
        }
    }

    const deleteTodo = async (id: string) => {
        const res = window.confirm('本当に削除しますか？');
        if (res) {
            await axios.get(`http://localhost:8080/api/todolist/delete/${id}`);
            loadTodos();
        }
    }

    const completeTodo = async (id: string) => {
        await axios.get(`http://localhost:8080/api/todolist/complete/${id}`);
        loadTodos();
    }


    // modal
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    // const [EditModalIsOpen] = useState(false); //setEditModalIsOpen
    const openAddModal = () => {
        setTmpEditId('');
        setAddModalIsOpen(true);
    };
    const closeAddModal = () => {
        setAddModalIsOpen(false);
        loadTodos();
    };
    // const closeEditModal = () => {
    //     setAddModalIsOpen(false);
    //     loadTodos();
    // };

    const openEditModal = (id: string) => {
        setTmpEditId(id);
        setAddModalIsOpen(true);
    };


    return (
        <div className="todo-wrapper">
            <h1>Todo</h1>
            <table id="data-table">
                <tbody>
                    <tr>
                        <th onClick={() => sortTable(0)} className="todo_tables_th0">
                            カテゴリ
                            <span className="sort-arrow"></span>
                        </th>
                        <th onClick={() => sortTable(1)} className="todo_tables_th1">
                            内容
                            <span className="sort-arrow"></span>
                        </th>
                        <th onClick={() => sortTable(2)} className="todo_tables_th2">
                            ステータス
                            <span className="sort-arrow"></span>
                        </th>
                        <th onClick={() => sortTable(3)} className="todo_tables_th3">
                            期日
                            <span className="sort-arrow"></span>
                        </th>
                        <th className="todo_tables_th4">アクション</th>
                    </tr>
                    {tasks.map((task, index) => {

                        return (
                            <tr key={index}>
                                <td className="todo_tables_td0">{task.tag}</td>
                                <td className="todo_tables_td1">{task.contents}</td>
                                <td className="todo_tables_td2">{task.status === 0 ? "未" : "完了"}</td>
                                <td className="todo_tables_td3">{task.deadline}</td>
                                <td className="todo_tables_td4"><Button variant="contained" onClick={() => openEditModal(String(task.id))} sx={{ mr: 2 }}>編集</Button>
                                    {(() => {
                                        if (task.status === 0) {
                                            return <Button variant="outlined" onClick={() => completeTodo(String(task.id))}>完了</Button>;
                                        } else {
                                            return <Button variant="contained" color="secondary" onClick={() => deleteTodo(String(task.id))}>削除</Button>;
                                        }
                                    })()}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Button variant="contained" onClick={openAddModal}>追加<AddCircleOutlineIcon /></Button>
            <AddTodoModal
                addModalIsOpen={addModalIsOpen}
                closeAddModal={closeAddModal}
                id={tmpEditId}
            />
        </div>
    );
};

export default TodoList;