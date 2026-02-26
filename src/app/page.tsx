"use client" // ←※※注意ポイント①※※

// import React, { useEffect, useState } from 'react';
// import TodoList from './components/TodoList';
// import SamplePage from './components/Sample';
// import ViewTwitter from './components/ViewTwitter';
// import Schedule from './schedule/page';
import Login from "./components/Login/page";

// Todoアプリの中身
const Home = () => {
    // const [sample, setSample] = useState<string>("sample");
    // useEffect(() => {
    //     console.log(sample);
    // }, [sample]);
    return (
        <div>
            {/* <TodoList /> */}
            <Login />
            {/* <ViewTwitter /> */}
            {/* <Schedule /> */}
            {/* <SamplePage test={sample}/> */}
            {/* <input type="text" name="name" onChange={(e) => setSample(e.target.value)} value={sample} /> */}
        </div>
    );
};

export default Home;