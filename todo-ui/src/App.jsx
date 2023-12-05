import { useState } from 'react'
import './App.css'
import ListTodoComponent from './components/ListTodoComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TodoComponent from './components/TodoComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
        <HeaderComponent />

          <Routes>
            //http://localhost:8080
            <Route path="/" element={<ListTodoComponent />} />
            //http://localhost:8080/todos
            <Route path="/todos" element={<ListTodoComponent />} />
            //http://localhost:8080/add-todo
            <Route path="/add-todo" element={<TodoComponent/>} />
            //http://localhost:8080/update-todo
            <Route path="/update-todo/:id" element={<TodoComponent/>} />

          </Routes>

        <FooterComponent />
    </BrowserRouter>
    </>
  )
}

export default App
