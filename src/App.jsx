import { useEffect, useState } from "react"
import "./styles.css"
import { AddTodo } from "./addTodo"
import { TodoList } from "./TodoList"

export default function App() {
  
  const [todos, setTodos] = useState(()=>{
    const localValue = localStorage.getItem("LIST")
    if(localValue===null) return []
    return JSON.parse(localValue)
  })
 
  useEffect(()=>{
    localStorage.setItem("LIST", JSON.stringify(todos))
  } ,[todos])
  function newTodo(title){
            setTodos(currentTodo => {
          return [
            ...currentTodo,
            { id: crypto.randomUUID(), title, completed: false },
          ]
        })
  }

  function toggleTodo(id, completed){
      setTodos(currentTodo=>{
        return currentTodo.map(todo=>{
          if(todo.id === id){
            return {...todo, completed}
          }
          return todo
        })
      })  
  }
  function deleteId(id){
    setTodos(currentTodo=>{
      return currentTodo.filter(todo=>todo.id !== id)
    })
  }
  return <>
    <AddTodo onSubmit={newTodo}/>
    <h1>Todo List</h1>
    <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo = {deleteId}/>
  </>
}