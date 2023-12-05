import React, { useState, useEffect } from 'react'
import { completeTodo, deleteTodo, getAllTodos, incompleteTodo } from '../services/TodoService';
import { useNavigate } from 'react-router-dom';

const ListTodoComponent = () => {

    const [todos, setTodos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
       ListTodos();
    },[])

    const ListTodos = () => {
        getAllTodos().then((response) => {
            setTodos(response.data)

        }).catch((error) => {
            console.log(error)
        })
    }

    const addNewTodo = () => {
        navigate('/add-todo');
    }

    const updateTodo = (id) => {
        console.log(id);
        navigate(`/update-todo/${id}`);   // we are not using single quotes ''
                                          // we use backtick symbol ``
    }

    const removeTodo = (id) => {
        deleteTodo(id).then((response) => {
            ListTodos();

        }).catch((error) => {
            console.log(error)
        })
    }

    const markCompleteTodo = (id) => {
        completeTodo (id).then((response) => {
            ListTodos();
        }).catch((error) => {})
    }

    const markInCompleteTodo = (id) => {
        incompleteTodo (id).then((response) => {
            ListTodos();
            
        }).catch((error) => {
            console.log(error)
        })
    }

  return (

    <div className='container'>

        <h2 className='text-center'>List of Todos</h2>
        <button className='btn btn-primary mb-2' onClick={addNewTodo}>Add New Todo</button>
        <div>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Todo Title</th>
                        <th>Todo Description</th>
                        <th>Todo Complete</th>
                        <th>Actions</th>
                        
                    </tr>
                </thead>
                <tbody>

                        {
                            todos.map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.title}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.completed ? "yes": "No"}</td>
                                        <td>
                                            <button className='btn btn-info' onClick={() => updateTodo(todo.id)}>Update</button>
                                            <button className='btn btn-danger' onClick={() => removeTodo(todo.id)}>Delete</button>
                                            <button className='btn btn-success' onClick={() => markCompleteTodo(todo.id)}>Complete</button>
                                            <button className='btn btn-info' onClick={() => markInCompleteTodo(todo.id)}>inComplete</button>
                                        </td>
                                    </tr>
                            
                            )
                        }

                </tbody>
            </table>
        </div>

    </div>

  )
}

export default ListTodoComponent