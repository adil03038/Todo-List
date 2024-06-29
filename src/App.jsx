import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleEdit = (e, id) => {
    const itemToEdit = todos.find(i => i.id === id);
    setTodo(itemToEdit.todo);
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };

  const handleDelete = (e, id, text) => {
    const answer = confirm(`Are you sure to delete the todo: "${text}"?`);
    if (answer) {
      const newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
    }
  };

  const handleAdd = (text) => {
    if (text.length >= 4) {
      setTodos([...todos, { id: uuidv4(), todo: text, isCompleted: false }]);
      setTodo("");
    } else {
      alert("You should write some text to save to todo list");
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const toggleFinshed = (e) => {
    setshowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto mx-3 my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[40%]">
      <h1 className='font-bold text-center text-2xl'>Your iTask - Manage your Todos in one place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-5 py-1' />
          <button onClick={() => handleAdd(todo)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white text-sm font-bold rounded-lg mx-2'>Save</button>
          </div>
        </div>
        <input className='my-4' type="checkbox" onChange={toggleFinshed} checked={showFinished} id='show' /> <label htmlFor="show" className='mx-2'>Show Finshed</label>
        <div className='h-[1px] bg-black opacity-40 w-[90%] mx-auto my-2'></div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
        <div className="todos">
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex  my-3 justify-between">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through text-wrap" : "text-wrap"}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white text-sm font-bold rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => handleDelete(e, item.id, item.todo)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white text-sm font-bold rounded-md mx-1'><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
