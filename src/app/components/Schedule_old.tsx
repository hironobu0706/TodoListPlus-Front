// クライアントコンポーネント
"use client" // ←※※注意ポイント①※※

// import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Schedule = () => {
    // const weeks = ['日', '月', '火', '水', '木', '金', '土']
    // const date = new Date()
    // let year = date.getFullYear()
    // let month = date.getMonth() + 1
    // const config = {
    //     show: 3,
    // }

    // function showCalendar(year:number, month:number) {
    //     for (let i = 0; i < config.show; i++) {
    //         const calendarHtml = createCalendar(year, month)
    //         const sec = document.createElement('section')
    //         sec.innerHTML = calendarHtml
    //         document.querySelector('#calendar')?.appendChild(sec)

    //         month++
    //         if (month > 12) {
    //             year++
    //             month = 1
    //         }
    //     }
    // }

    // function createCalendar(year:number, month:number) {
    //     const startDate = new Date(year, month - 1, 1) // 月の最初の日を取得
    //     const endDate = new Date(year, month, 0) // 月の最後の日を取得
    //     const endDayCount = endDate.getDate() // 月の末日
    //     const lastMonthEndDate = new Date(year, month - 2, 0) // 前月の最後の日の情報
    //     const lastMonthendDayCount = lastMonthEndDate.getDate() // 前月の末日
    //     const startDay = startDate.getDay() // 月の最初の日の曜日を取得
    //     let dayCount = 1 // 日にちのカウント
    //     let calendarHtml = '' // HTMLを組み立てる変数

    //     calendarHtml += '<h1>' + year + '/' + month + '</h1>'
    //     calendarHtml += '<table>'

    //     // 曜日の行を作成
    //     for (let i = 0; i < weeks.length; i++) {
    //         calendarHtml += '<td>' + weeks[i] + '</td>'
    //     }

    //     for (let w = 0; w < 6; w++) {
    //         calendarHtml += '<tr>'

    //         for (let d = 0; d < 7; d++) {
    //             if (w == 0 && d < startDay) {
    //                 // 1行目で1日の曜日の前
    //                 const num = lastMonthendDayCount - startDay + d + 1
    //                 calendarHtml += '<td class="is-disabled">' + num + '</td>'
    //             } else if (dayCount > endDayCount) {
    //                 // 末尾の日数を超えた
    //                 const num = dayCount - endDayCount
    //                 calendarHtml += '<td class="is-disabled">' + num + '</td>'
    //                 dayCount++
    //             } else {
    //                 calendarHtml += `<td class="calendar_td" data-date="${year}/${month}/${dayCount}">${dayCount}</td>`
    //                 dayCount++
    //             }
    //         }
    //         calendarHtml += '</tr>'
    //     }
    //     calendarHtml += '</table>'

    //     return calendarHtml
    // }

    // function moveCalendar(e) {
    //     document.querySelector('#calendar').innerHTML = ''

    //     if (e.target.id === 'prev') {
    //         month--

    //         if (month < 1) {
    //             year--
    //             month = 12
    //         }
    //     }

    //     if (e.target.id === 'next') {
    //         month++

    //         if (month > 12) {
    //             year++
    //             month = 1
    //         }
    //     }

    //     showCalendar(year, month)
    // }

    // document.querySelector('#prev')?.addEventListener('click', moveCalendar);
    // document.querySelector('#next')?.addEventListener('click', moveCalendar);

    // document.addEventListener("click", function (e) {
    //     if (e.target.classList.contains("calendar_td")) {
    //         alert('クリックした日付は' + e.target.dataset.date + 'です')
    //     }
    // })

    // showCalendar(year, month)

    return (
        <div className="todo-wrapper">
            <h1>予定表</h1>
            <div className="mt20">
                対象日：{'2025/4/24'}
            </div>

            <Button variant="contained" onClick={() => alert('追加')}>追加</Button>
            <table className='scheduleTable'>
                <tbody>
                    <tr>
                        <td>
                            <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                defaultValue="Hello World"
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