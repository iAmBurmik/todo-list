import { useEffect } from 'react';
import { AddTodoInput } from './components/AddTodoInput';
import { TodoList } from './components/TodoList';
import { Loader } from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from './store/todoSlice';

function App() {

  const dispatch = useDispatch();
  const {status, error} = useSelector(state => state.todos) // отримуєм статус та помилку з стану redux

  useEffect(() => {
    dispatch(fetchTodos()); // отримуєм наші todos
  }, [dispatch]);


  return (
    <div className="App">
        <AddTodoInput/> 
        {status === 'loading' && <Loader/>}
        {error && <h2>{error}</h2>}
        <TodoList status={status}/>
    </div>
  );
}

export default App;