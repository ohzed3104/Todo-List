import { useState } from "react";
import { useEffect } from "react";
import "./assets/app.css";
function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("my-todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [addJobs, setAddjobs] = useState("");
  // them todo
  const handleAddTodo = () => {
    if (addJobs.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: addJobs,
      done: false,
    };
    setTodos([...todos, newTodo]);
    setAddjobs("");
  };
  //line-through khi nhan vao text
  const handleToggle = (id) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(updateTodos);
  };
  //xoa todo
  const handleDeleteTodo = (id) => {
    const updateTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updateTodos);
  };
  useEffect(() => {
    localStorage.setItem("my-todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <div className="contain">
      <div className="title">
        <h1>Todo App </h1>
      </div>
      <div className="content">
        <button className="button" onClick={handleAddTodo}>
          Add
        </button>
        <input
          className="input"
          value={addJobs}
          type="text"
          onChange={(e) => setAddjobs(e.target.value)}
          placeholder="Nhập công việc"
        />
      </div>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => handleToggle(todo.id)} //neu goi ngay handleToggle thi ngay lap tuc component render thay vi doi su kien click
            style={{
              cursor: "pointer",
              textDecoration: todo.done ? "line-through" : "none",
            }}
          >
            <span>{todo.text}</span>
            <button
              className="button-remove"
              onClick={(e) => {
                e.stopPropagation(); //tranh bi toogle khi bam xoa
                handleDeleteTodo(todo.id);
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
