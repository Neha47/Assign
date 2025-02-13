import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await axios.get('http://localhost:5000/todos/ask' , {
        headers: { 'Authorization': localStorage.getItem('token') } });
    console.log(response.data);
    return response.data;
}); 

// here we have an async thunk fetchTodos that fetches the todos from the server using axios.
// the async thunk is created using the createAsyncThunk function from the redux toolkit.


export const updateTodo = createAsyncThunk('todos/updateTodo', async (id) => {
    await axios.put(`http://localhost:5000/todos/${id}` , {} , {
        headers: { 'Authorization': localStorage.getItem('token') } });
    console.log('updated');
    return id;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (title) => {
    const response = await axios.post('http://localhost:5000/todos/add', { title }, {
        headers: { 'Authorization': localStorage.getItem('token') }
    });
    console.log(response.data);
    return response.data;
});

// here we have an async thunk addTodo that adds a new todo to the server using axios.
// the async thunk is created using the createAsyncThunk function from the redux toolkit.

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}` , {
        headers: { 'Authorization': localStorage.getItem('token') } });
    console.log(id);
    console.log('deleted');
    return id;
});

// here todos/deleteTodo is the action type , which is used to identify the action in the reducer.

// here we have an async thunk deleteTodo that deletes a todo from the server using axios.
// the async thunk is created using the createAsyncThunk function from the redux toolkit.

const todoSlice = createSlice({
    name: 'todos',
    initialState: { items: [], status: 'idle' },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.items = state.items.map(todo => {
                    if (todo.id === action.payload) {
                        return { ...todo, status: todo.status === 1 ? 0 : 1 };
                    }
                    return todo;
                }); 
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.items = state.items.filter(todo => todo.id !== action.payload);
            });
    },
});

// here we have a todoSlice that uses createSlice from the redux toolkit to create a slice of the store that manages the todos.
// the slice has an initialState field that has two fields:
// items, which is an array of todos, 
// and status, which is a string that represents the status of the async thunks.
// the slice has an extraReducers field that listens to the fulfilled action of each async thunk and updates the state accordingly.
// the slice does not have any actions, as the async thunks handle all the logic.

export default todoSlice.reducer;

// here we have a todoSlice that uses createSlice and createAsyncThunk from redux toolkit 
// to create a slice of the store that manages the todos.
// We have three async thunks: fetchTodos, addTodo, and deleteTodo. (thunk is a function that wraps an expression to delay its evaluation)
// fetchTodos fetches the todos from the server, addTodo adds a new todo, and deleteTodo deletes a todo.
// the extraReducers field of the slice listens to the fulfilled action of each async thunk and updates the state accordingly. 
// the state has two fields: items, which is an array of todos, and status, which is a string that represents the status of the async thunks. 
// the slice does not have any actions, as the async thunks handle all the logic. The slice is exported as the default export,
// which is the reducer function that can be used in the store configuration. 
// the slice can be used in a component by using the useDispatch and useSelector hooks to dispatch 
// the async thunks and access the todos from the store. 
// the component can dispatch the async thunks to fetch, add, and delete todos, and display the todos in a list. 
// the component can also redirect the user to the login page if the user is not authenticated. 
// the component can be used in the App component to display the todo form and list, and in the TodoForm component to add a new todo, 
// and in the TodoList component to display the list of todos and delete a todo. 
// the slice can be used in the store configuration to create a store that manages the todos. 
// the store can be used in the index file to provide the store to the app component. 
// the app component can be used in the index file to render the app in the root element of the HTML document. 