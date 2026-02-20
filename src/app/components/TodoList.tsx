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
import TodoRow from './TodoRow';
// import { useRouter } from 'next/navigation';

const TodoList = () => {
    // タスクと新しいタスク入力を管理するためのuseState
    const [tasks, setTasks] = useState<TodoItemInterface[]>([]); // ←※※注意ポイント②※※
    const [tmpEditId, setTmpEditId] = useState<string>("");

    useEffect(() => {
        loadTodos();
    }, [])

    const loadTodos = async () => {
        try {
            const result = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/api/getAllTodolist`);
            setTasks(result.data);
        } catch (e) {
            console.log(e);
            // サンプルデータ
            const sampleData: TodoItemInterface = {
                id: 999,
                priority: 0,
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
            await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/api/todolist/delete/${id}`);
            loadTodos();
        }
    };

    const completeTodo = async (id: string) => {
        await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/api/todolist/complete/${id}`);
        loadTodos();
    };
    // modal
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const openAddModal = () => {
        setTmpEditId('');
        setAddModalIsOpen(true);
    };
    const closeAddModal = () => {
        setAddModalIsOpen(false);
        loadTodos();
    };
    const openEditModal = (id: string) => {
        setTmpEditId(id);
        setAddModalIsOpen(true);
    };
    const categoryArray: string[] = ["優先度","カテゴリ", "内容", "ステータス", "期限", "アクション"];

    return (
        <div className="todo-wrapper">
            <h1>Todo</h1>
            <table id="data-table">
                <tbody>
                    <tr>
                        {categoryArray.map((category, key) => {
                            return (
                                <th onClick={() => sortTable(key)} className={`todo_tables_th${key}`} key={key}>
                                    {category}
                                    <span className="sort-arrow"></span>
                                </th>
                            )
                        })}
                    </tr>
                    {tasks.map((task, index) => {
                        return (
                            <TodoRow
                                key={index}
                                task={task}
                                openEditModal={openEditModal}
                                deleteTodo={deleteTodo}
                                completeTodo={completeTodo}
                            />
                        )
                    })}
                </tbody>
            </table>
            <Button variant="contained" onClick={openAddModal}>
                追加<AddCircleOutlineIcon />
            </Button>
            <AddTodoModal
                addModalIsOpen={addModalIsOpen}
                closeAddModal={closeAddModal}
                id={tmpEditId}
            />
        </div>
    );
};

export default TodoList;