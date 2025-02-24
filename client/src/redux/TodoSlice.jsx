import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await axios.get('http://localhost:5000/todos/ask' , {
        headers: { 'Authorization': localStorage.getItem('token') } });
    console.log(response.data);
    return response.data;
});

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

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}` , {
        headers: { 'Authorization': localStorage.getItem('token') } });
    console.log(id);
    console.log('deleted');
    return id;
});

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
                    if (todo._id === action.payload) {
                        return { ...todo, status: !todo.status };
                    }
                    return todo;
                }); 
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.items = state.items.filter(todo => todo._id !== action.payload);
            });
    },
});

export default todoSlice.reducer;