import { useState } from "react";
import styles from './Todo.module.css'
import { useDispatch } from "react-redux";
import { changeComplete, deleteTodo, changeTitle } from "../store/todoSlice";

export const Todo = ({id, title, completed }) => {

    const [inputTitle, setinputTitle] = useState(title); // значення інпута
    const [isEditing, setIsEditing] = useState(false); // чи змінюємо ми значення

    const dispatc = useDispatch();

    const changeTextHandler = (event) => {
        setinputTitle(event.target.value); // міняємо текст інпута
    }

    const stopEditing = () => {
        dispatc(changeTitle({id, title: inputTitle})); // після зміни тексту виклакаємо відповідний метод
        setIsEditing(false); // встановлюємо setIsEditing false
    }

    return (
        <div className={`${styles.item} ${completed ? styles.completed : ""}`} data-height="60" data-top="0">
            <div className={styles["item-icon"]}>
                { !completed
                ? <svg className={styles.uncompleted} onClick={() => dispatc(changeComplete({id, completed: true}))} aria-hidden="true" data-prefix="far" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"></path></svg>
                : <svg className={styles.completed} onClick={() => dispatc(changeComplete({id, completed: false}))} aria-hidden="true" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                }
            </div>
            <div className={styles["item-name"]} onDoubleClick={() => setIsEditing(true)}>
                { isEditing 
                ? <input className={styles.titleInput} type="text" value={inputTitle} onChange={changeTextHandler} onBlur={stopEditing} autoFocus/>
                : <h1>{inputTitle}</h1>
                }           
            </div>
            <div className={styles["item-edit"]}>
                <svg onClick={() => setIsEditing(true)} aria-hidden="true" data-prefix="fas" data-icon="pen" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path></svg>
            </div>
            <div className={styles["item-delete"]}>
                <svg onClick={() => dispatc(deleteTodo(id))} aria-hidden="true" data-prefix="fas" data-icon="times-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>
            </div>
        </div>
    )
}