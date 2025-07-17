import axios from "axios";
import { useState, useEffect } from "react";
import CreateTodo from "./CreateTodo";
import SearchTodo from "./SearchTodo";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [allTodos, setAllTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:7000/todos", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTodos(res.data.todos || []);
        setAllTodos(res.data.todos || []);
      })
      .catch((err) => {
        console.error("Error fetching todos:", err);
        setError("Could not load todos. Please sign in again.");
      });
  }, []);

  return (
    <div id="maindiv" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Welcome to your Dashboard</h2>
      <CreateTodo
        todoInput={todoInput}
        setTodoInput={setTodoInput}
        setTodos={setTodos}
        todos={todos}
        setAllTodos={setAllTodos}
        allTodos={allTodos}
        setError={setError}
        error={error}
      />
      <SearchTodo
        todoInput={todoInput}
        setTodos={setTodos}
        allTodos={allTodos}
      />
    </div>
  );
}

export default Dashboard;
