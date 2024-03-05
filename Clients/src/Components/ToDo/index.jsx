import React, { useState } from 'react'
import './style.css';

function ToDo({ user, setUser }) {
  const [todoId, setTodoId] = useState(user.todos.length ? user.todos[user.todos.length - 1].id + 1 : 0)

  const addTodo = (e) => {
    e.preventDefault();
    const newTodoTitle = e.target.todo.value.trim();

    if (newTodoTitle === "") {

      return;
    }

    setTodoId(todoId + 1);

    fetch(`http://localhost:3000/data/${user.id}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todos: [
          ...user.todos,
          {
            id: todoId,
            title: newTodoTitle
          }
        ]
      })
    }).then(res => {
      if (res.ok) {
        fetch(`http://localhost:3000/data/${user.id}`)
          .then(res => res.json())
          .then(data => setUser(data))
      }
    });
    e.target.todo.value = "";
  }

  const deleteTodo = (id) => {
    const filteredTodos = user.todos.filter(todo => todo.id !== id)

    fetch(`http://localhost:3000/data/${user.id}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todos: [
          ...filteredTodos
        ]
      })
    })
      .then(res => {
        if (res.ok) {
          setUser({ ...user, todos: filteredTodos })
        }
      })
  }

  return (
    <div>
      <div className="Wrapper">
        <div className='Background'>
          <div className='TitleText'>
            <p className='p'>My To-do List</p>
            <div className="divButton">
              <form onSubmit={addTodo}>
                <input type="text" className='addList' placeholder='Type here, to add list.' id='todo' />
              </form>
              <button className='logOut'>Log Out</button>
            </div>
          </div>
          <br />
          <ul className='todos'>
            <hr />
            {
              user.todos.map(todo => <li key={todo.id}><span>{todo.title}</span><button onClick={() => deleteTodo(todo.id)} className='delete'>Delete</button></li>)
            }
          </ul>
          <br />
        </div>
      </div>
    </div>
  )
}

export default ToDo;
