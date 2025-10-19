import React from 'react';
import TodoList from './components/TodoList';
import SamplePage from './components/Sample';
// import ViewTwitter from './components/ViewTwitter';
// import Schedule from './schedule/page';

// Todoアプリの中身
const Home = () => {
    return (
        <div id="todoApp" className="container mx-auto p-8 text-center max-w-2xl">
            <TodoList />
            {/* <ViewTwitter /> */}
            {/* <Schedule /> */}
            <SamplePage>test</SamplePage>
        </div>
    );
};

export default Home;