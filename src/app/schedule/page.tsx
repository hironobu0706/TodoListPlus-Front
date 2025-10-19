// クライアントコンポーネント
"use client" // ←※※注意ポイント①※※

// import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./schedule.css";

const Schedule = () => {
    const dataList = [];

    return (
        <div className="todo-wrapper">
            <h1>予定表</h1>
            <div className="mt20">
                対象日：{'2025/4/24'}
            </div>

            <div className="mt20">
                <TextField
                    required
                    type="time"
                    id="outlined-required"
                    label="Required"
                    defaultValue="10:00"
                />
                <Button variant="contained" onClick={() => alert('追加')}>追加</Button>
            </div>
            <table className='scheduleTable mt20'>
                <tbody>
                    <tr>
                        <td>
                            <TextField
                                required
                                type="time"
                                id="outlined-required"
                                label="Required"
                                defaultValue="10:00"
                            /></td>
                        <td>
                            <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                defaultValue="Hello World"
                            /></td>
                        <td><Button variant="contained" color="secondary" onClick={() => alert('削除')}>削除</Button></td>
                    </tr>
                </tbody>
            </table>

            <Button variant="contained" onClick={() => alert('DB反映')}>DB反映</Button>
        </div >
    );
};

export default Schedule;