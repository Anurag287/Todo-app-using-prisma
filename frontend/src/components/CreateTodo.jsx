import axios from "axios";

function CreateTodo(props) {
  function addTodo() {
    if (!props.todoInput.trim()) return;

    axios
      .post(
        "http://localhost:7000/todos",
        { todo: props.todoInput },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        props.setTodos([...props.todos, res.data]);
        props.setAllTodos([...props.allTodos, res.data]);
        props.setTodoInput("");
      })
      .catch((err) => {
        console.error("Error adding todo:", err);
        props.setError("Could not add todo.");
      });
  }

  function deleteTodo(id) {
    axios
      .delete(`http://localhost:7000/todos/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // Optionally, refetch todos or remove from state
        props.setTodos(props.todos.filter((todo) => todo.id !== id));
        props.setAllTodos(props.allTodos.filter((todo) => todo.id !== id));
      });
  }

  return (
    <div>
      <input
        placeholder="Enter your todo here"
        value={props.todoInput}
        onChange={(e) => props.setTodoInput(e.target.value)}
        style={{ padding: "5px", width: "300px" }}
      />
      <button onClick={addTodo} style={{ marginLeft: "10px" }}>
        Add
      </button>
      {props.error && <p style={{ color: "red" }}>{props.error}</p>}
      <div style={{ marginTop: "20px" }}>
        <h3>Your Todos:</h3>
        <ul>
          {props.todos.map((todoItem, index) => (
            <div
              key={todoItem.id || index}
              style={{ display: "flex", gap: "30px" }}
            >
              <li>{todoItem.todo}</li>
              <button onClick={() => deleteTodo(todoItem.id)}>Delete</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CreateTodo;