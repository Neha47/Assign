import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './TodoSlice';

export const store = configureStore({
    reducer: {
        todos: todoReducer,
    },
});

// in redux the store is the single source of truth for the application state.
// the store is created using the configureStore function from the redux toolkit.
// the store is configured with a reducer that manages the todos using the todoSlice reducer.
// the store is exported as the default export, which can be used in the index file to provide the store to the app component.
// the store can be used in the app component to dispatch actions and access the state of the store.
// the store can be used in the todoSlice to listen to the actions dispatched by the component and update the state accordingly.
// the store can be used in the index file to provide the store to the app component.
// in short , store is basically a place where all the states are stored and managed.