// クライアントコンポーネント
// "use client" // ←※※注意ポイント①※※

// 必要なライブラリとコンポーネントをインポート
import { useEffect, useState } from 'react';
import axios from 'axios';
import type { TodoItemInterface } from '../../types/types';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// modal
import AddTodoModal from '../modal/AddTodoModal';
import todoStore from "../../stores/todoStore";
import TodoTable from './TodoTable';

const TodoList = () => {
    // タスクと新しいタスク入力を管理するためのuseState
    const [tasks, setTasks] = useState<TodoItemInterface[]>([]);
    const [tmpEditId, setTmpEditId] = useState<string>("");
    const userId = todoStore.getState().user_id;

    // ストレージにuserId保存
    // localStorage.setItem('userId', userId);
    // alert(localStorage.getItem('userId'));

    // loginTokenの取得
    // const loginToken = todoStore((store) => store.loginToken);

    useEffect(() => {
        loadTodos();
    }, [])

    const loadTodos = async () => {
        let result;
        try {
            result = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/getTodolistWithUserId?user_id=${userId}`);
            setTasks(result.data);
        } catch (e) {
            console.log(e);
        } finally {
            if (result?.data.length === 0) {
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
    }

    const deleteTodo = async (id: string) => {
        const res = window.confirm('本当に削除しますか？');
        if (res) {
            await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/todolist/delete/${id}`);
            loadTodos();
        }
    };

    const completeTodo = async (id: string) => {
        await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/todolist/complete/${id}`);
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
    
    return (
        <div id="todoApp" className="container mx-auto p-8 text-center max-w-2xl">
            <div className="todo-wrapper">
                <h1>Todo</h1>
                <TodoTable
                    tasks={tasks}
                    openEditModal={openEditModal}
                    deleteTodo={deleteTodo}
                    completeTodo={completeTodo}
                />
                <Button variant="contained" onClick={openAddModal}>
                    追加
                    <AddCircleOutlineIcon />
                </Button>
                <AddTodoModal
                    addModalIsOpen={addModalIsOpen}
                    closeAddModal={closeAddModal}
                    id={tmpEditId}
                    loadTodos={loadTodos}
                />
            </div>
        </div>
    );
};

export default TodoList;