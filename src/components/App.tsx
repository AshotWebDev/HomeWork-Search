import AddTodo from "./AddTodo";
import PlanetsList from "./PlanetsList";
import TodoList from "./TodoList";
import UserList from "./UserList";

function App() {
  return (
    <div>
      <h1>Todo App</h1>
      <TodoList />

      <AddTodo />

      <UserList/>

      <PlanetsList/>

    </div>
  );
}

export default App;
