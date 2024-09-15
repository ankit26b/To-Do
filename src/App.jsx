import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])


  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:w-3/4 md:mx-auto my-5 rounded-lg p-5 bg-green-300 min-h-[80vh]">
        <div className="addtodo my-5">
          <h2 className="text-lg font-bold text-gray-900"> Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='rounded-lg w-1/2'></input>
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-green-600 hover:bg-green-500 p-2 py-1 text-white rounded-md mx-6 font-bold hover:text-gray-800'>Save</button>
        </div>
        
        <diV className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></diV>

        <h2 className='text-xl font-bold text-gray-900'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {
            return <div key={item.id} className="todo flex md:w-1/2 justify-between my-3">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-green-600 hover:bg-green-500 p-2 py-1 text-white rounded-md mx-1 font-bold hover:text-gray-800'><CiEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-green-600 hover:bg-green-500 p-2 py-1 text-white rounded-md mx-1 font-bold hover:text-gray-800'><MdDelete /></button>
              </div>
            </div>

          })}
        </div>

      </div>
    </>
  )
}

export default App
