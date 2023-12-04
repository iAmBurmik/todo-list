import usePagination from '../hooks/usePagination';
import { Pagination } from './Pagination';
import { Todo } from './Todo'
import styles from './TodoList.module.css'
import { useSelector } from 'react-redux';


export const TodoList = ({status}) => {

  const todos = useSelector(state => state.todos.list); // отрумуємо список todos

  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 7,
    count: todos.length,
  }); // хук для пагінації


  if(status === 'resolved' && todos.length === 0) {
    return <p className={styles.noTodos}>Time to chill! You have no todos.</p> // якщо список порожній, повертаємо відповідне значення
  }

    return (
        <>
          <Pagination nextPage={nextPage} prevPage={prevPage} page={page} setPage={setPage} totalPages={totalPages}/>
          <div className={styles["items-container"]}>
            {todos
              .slice(firstContentIndex, lastContentIndex)
              .map(todo => <Todo key={todo.id+todo.title} id={todo.id} title={todo.title} completed={todo.completed}/>)} 
          </div>
        </> // key={todo.id+todo.title} - для нормального відображення, бо для кожного нового ел. буде id-201, а key повинен бути унікальним
    )
}