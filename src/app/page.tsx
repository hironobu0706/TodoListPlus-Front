"use client" // ←※※注意ポイント①※※

import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
// import SamplePage from './components/Sample';
// import ViewTwitter from './components/ViewTwitter';
// import Schedule from './schedule/page';

// Todoアプリの中身
const Home = () => {
    // const [sample, setSample] = useState<string>("sample");
    // useEffect(() => {
    //     console.log(sample);
    // }, [sample]);
    return (
        <div id="todoApp" className="container mx-auto p-8 text-center max-w-2xl">
            <TodoList />
            {/* <ViewTwitter /> */}
            {/* <Schedule /> */}
            {/* <SamplePage test={sample}/> */}
            {/* <input type="text" name="name" onChange={(e) => setSample(e.target.value)} value={sample} /> */}
        </div>
    );
};

export default Home;