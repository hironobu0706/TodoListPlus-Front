// クライアントコンポーネント
// "use client" // ←※※注意ポイント①※※

// 必要なライブラリとコンポーネントをインポート
import { memo } from 'react';
// import TodoRow from './TodoRow';
// import TodoAdd from './TodoAdd';
// import Link from "next/link";
// import { sortTable } from '../../../util/sortTable';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// modal
// import EditTodoModal from './modal/old_EditTodoModal';
import TodoRow from './TodoRow';
import type { TodoItemInterface } from '../../types/types';
// import { useRouter } from 'next/navigation';


interface TodoTableProps {
    tasks: TodoItemInterface[];
    openEditModal: (id: string) => void;
    deleteTodo: (id: string) => void;
    completeTodo: (id: string) => void;
}
const TodoTable = memo((todoTableProps: TodoTableProps) => {
    const { tasks, openEditModal, deleteTodo, completeTodo } = todoTableProps;
    const categoryArray: string[] = ["優先度", "カテゴリ", "内容", "ステータス", "期限", "アクション"];
    return (
        <table id="data-table">
            <tbody>
                <tr>
                    {categoryArray.map((category, key) => {
                        return (
                            <th className={`todo_tables_th${key}`} key={key}>
                                {/* <th onClick={() => sortTable(key)} className={`todo_tables_th${key}`} key={key}> */}
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
    );
});

export default TodoTable;