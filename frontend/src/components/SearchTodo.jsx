import axios from "axios";

function SearchTodo(props)
{
   function searchTodo() {
    if (!props.todoInput.trim()) {
      props.setTodos(props.allTodos);
      return;
    }
    const filtered = props.allTodos.filter((todoItem) =>
      todoItem.todo.toLowerCase().includes(props.todoInput.toLowerCase())
    );
    props.setTodos(filtered);
  }

  return(
    <div>
      <button onClick={searchTodo}>Search</button>
    </div>
  )
}

export default SearchTodo;