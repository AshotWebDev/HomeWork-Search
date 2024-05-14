import { checkTodo, delTodo } from "../features/todo/todoSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const TodoListItem = ({ todo }) => {
  const dispatch = useAppDispatch();

  const handleDeleteTodo = () => {
    dispatch(delTodo(todo.id));
  }

  const handleCheckTodo = () => {
    dispatch(checkTodo(todo.id))
  }
  return (
    <li >
      <span style={{textDecoration : todo.completed ? "line-through" : ""}}>{todo.text}</span>
      <button onClick={handleCheckTodo}>Complete</button>
      <button onClick={handleDeleteTodo}>Delete</button>
    </li>
  );
};

export default TodoListItem;