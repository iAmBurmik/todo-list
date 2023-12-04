import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk( // функція отримання даних з сервера
    'todos/fetchTodos',
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos'); // отримуємо відповідь
  
            if (!response.ok) { // якщо відповідь не добра
                throw new Error('Network response was not ok'); // викликаємо помилку
            }
        
            const data = await response.json(); // отримуємо дані
            return data; // повертаємо дані
        } catch (error) {
            return rejectWithValue(error.message); // викликаємо метод rejectWithValue та передаємо помилку
        }
    }
);

export const deleteTodo = createAsyncThunk( // фунція видалення todo
    'todos/deleteTodo',
    async function(id, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE',
            }); // видаляємо todo з сервера

            if (!response.ok) { // якщо відповідь не добра
                throw new Error('Network response was not ok'); // викликаємо помилку
            }

            dispatch(removeTodo(id)); // видаляємо todo локально 
        } catch (error) {
            return rejectWithValue(error.message); // викликаємо метод rejectWithValue та передаємо помилку
        }
    }
);

export const addNewTodo = createAsyncThunk( // функція додавання todo
    'todos/addNewTodo',
    async function(title, {rejectWithValue, dispatch}) {
        try {
            const todo = { title, userId: 10, completed: false } // формування нового todo
            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              }); // додаємо todo на серері
          
              if (!response.ok) { // якщо відповідь не добра
                throw new Error('Network response was not ok'); // викликаємо помилку
              }
          
              const data = await response.json(); // отримуємо доданий todo
              dispatch(addTodo(data)); // додаємо todo локально
        } catch (error) {
            return rejectWithValue(error.message); // викликаємо метод rejectWithValue та передаємо помилку
        }
    }
);

export const changeComplete = createAsyncThunk( // функція оновлення стану
    'todos/addTodo',
    async function({id, completed}, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ completed }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              }); // оновляємо стан на сервері
          
              if (!response.ok) { // якщо відповідь не добра
                throw new Error('Network response was not ok'); // викликаємо помилку
              }
          
              dispatch(changeTodoComplete({id, completed})); // оновляємо стан локально
        } catch (error) {
            return rejectWithValue(error.message); // викликаємо метод rejectWithValue та передаємо помилку
        }
    }
);

export const changeTitle = createAsyncThunk( // функція оновлення тексту
    'todos/changeTitle',
    async function({id, title}, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ title }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              }); // оновляємо текст на сервері
          
              if (!response.ok) { // якщо відповідь не добра
                throw new Error('Network response was not ok'); // викликаємо помилку
              }
          
              dispatch(changeTodoTitle({id, title})); // оновляємо текст локально
        } catch (error) {
            return rejectWithValue(error.message); // викликаємо метод rejectWithValue та передаємо помилку
        }
    }
);


const setError = (state, action) => {  // функція, якщо оримано помилку
    state.status = 'rejected'; // зманюємо статус на відхилено
    state.error = action.payload; // записуємо помилку до стану
};

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        list: [],
        status: null,
        error: null,
    },
    reducers: {
        addTodo(state, action) { 
            state.list.push(action.payload); // додавання todo до локального стану
        },
        removeTodo(state, action) {
            state.list = state.list.filter(todo => todo.id !== action.payload); // видалення todo з локального стану
        },
        changeTodoComplete(state, action) {
            const currentTodo = state.list.find(todo => todo.id === action.payload.id); // пошук потрібного todo
            currentTodo.completed = action.payload.completed; // зміна його стану
        },
        changeTodoTitle(state, action) {
            const currentTodo = state.list.find(todo => todo.id === action.payload.id); // пошук потрібного todo
            currentTodo.title = action.payload.title; // зміна його текста
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => { // якщо fetchTodos ще отримує дані
                state.status = 'loading'; // зманюємо статус на завантаження
                state.error = null; // обнулюємо помилку
            })
            .addCase(fetchTodos.fulfilled, (state, action) => { // якщо fetchTodos повернуло дані
                state.status = 'resolved'; // зманюємо статус на вирішено
                state.list = action.payload; // обнулюємо помилку
            })
            .addCase(fetchTodos.rejected, setError) // якщо сталася помилка
            .addCase(deleteTodo.rejected, setError) // якщо сталася помилка
            .addCase(changeComplete.rejected, setError) // якщо сталася помилка
            .addCase(changeTitle.rejected, setError) // якщо сталася помилка
            .addCase(addNewTodo.rejected, setError) // якщо сталася помилка
    },
});

const {addTodo, removeTodo, changeTodoComplete, changeTodoTitle} = todoSlice.actions;
export default todoSlice.reducer;
