import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
// import Home from './pages/Home';
import Login from './pages/component/Login';
import TodoList from './pages/component/Todo/TodoList';
// import NotFound from './pages/NotFound';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todoList" element={<TodoList />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
