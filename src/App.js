import React, { useState, useRef, useEffect } from 'react';
import { TodoList } from './TodoList';
import {v4 as uuidv4} from 'uuid';

const LOCAL_STOTAGE_KEY = "todoApplication.todos"

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
      const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STOTAGE_KEY));
      console.log(storedTodos);
      if(storedTodos) {
        setTodos(storedTodos);
      } 
  }, []);

  useEffect(() => {
      localStorage.setItem(LOCAL_STOTAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
      const name = todoNameRef.current.value;
      if (name === '') return;

      setTodos(prevTodos => {
        return [...prevTodos, {id: uuidv4(), name: name, complete: false}];
      })

      todoNameRef.current.value = null;
  }

  const handleClearTodos = () => {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    console.log('here');
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text"></input>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => !todos.complete).length} left to do</div>
    </>

  );
}

export default App;
