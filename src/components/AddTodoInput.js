import { useState } from "react";
import styles from './AddTodoInput.module.css'
import { useDispatch } from "react-redux";
import { addNewTodo } from "../store/todoSlice";

export const AddTodoInput = (props) => {

    const [todoText, setTodoText] = useState(''); // текст інпута
    const dispatc = useDispatch();

    const handleKeyDown = (event) => {  // функція, яка визивається при натисканні на клавішу
        if(todoText && event.key === 'Enter'){ // перевірка на Enter
            dispatc(addNewTodo(todoText)); // функція додавання
            setTodoText(''); // затираємо інпут
        }
    }

    const chandeTextHandler = (event) => { // функція зміни тексту
        setTodoText(event.target.value); // записуємо отримане значення
    }

    return (
        <div className={styles["add-item-input"]}>
            <svg aria-hidden="true" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
            <input 
            type="text" 
            placeholder="Add item..." 
            onKeyDown={handleKeyDown}
            onChange={chandeTextHandler}
            value={todoText}
            />
      </div>
    )
}