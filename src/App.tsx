import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css'
// import Home from './pages/Home';
import Login from './pages/component/Login';
import TodoList from './pages/component/Todo/TodoList';
import SigninInput from './pages/component/Signin/SigninInput';
// import NotFound from './pages/NotFound';

function App() {
  const toTop = () => {
      location.href = '/';
  }

  return (
    <div>
      <div className="header" onClick={toTop}>
        <h1>Todoアプリ</h1>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todoList" element={<TodoList />} />
          <Route path="/signin" element={<SigninInput />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
