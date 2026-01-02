// クライアントコンポーネント
// ←※※注意ポイント①※※
"use client"

import React, { memo } from "react";
import { getStatus } from '../util/statusMap';
import { Button } from "@mui/material";

interface TodoRowProps {
    task: {
        id: number;
        tag: string;
        contents: string;
        status: number;
        deadline: string;
    };
    openEditModal: (id: string) => void;
    deleteTodo: (id: string) => void;
    completeTodo: (id: string) => void;
}

// eslint-disable-next-line react/display-name
const TodoRow = memo((todoRowProps: TodoRowProps) => {
    const { task, openEditModal, deleteTodo, completeTodo } = todoRowProps;
    console.log("task.id:", task.id);

    return (
        <tr>
            <td className="todo_tables_td0">{task.tag}</td>
            <td className="todo_tables_td1">{task.contents}</td>
            <td className="todo_tables_td2">{getStatus(task.status)}</td>
            <td className="todo_tables_td3">{task.deadline}</td>
            <td className="todo_tables_td4"><Button variant="contained" onClick={() => openEditModal(String(task.id))} sx={{ mr: 2 }}>編集</Button>
                {(() => {
                    if (task.status === 9) {
                        return <Button variant="contained" color="secondary" onClick={() => deleteTodo(String(task.id))}>削除</Button>;
                    } else {
                        return <Button variant="outlined" onClick={() => completeTodo(String(task.id))}>完了</Button>;
                    }
                })()}</td>
        </tr>
    )
});

export default TodoRow;