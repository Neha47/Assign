import { Provider } from 'react-redux';
import {store} from '../redux/store';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

export default function Home() {
    if(!localStorage.getItem("token")){
        alert("You need to login first");
        window.location.href = "/login";
    }
    return (
        <Provider store={store}>
            <div className="max-w-md mx-auto mt-10">
                <h1 className="text-2xl font-bold text-center">Todo List</h1>
                <TodoForm />
                <TodoList />
            </div>
        </Provider>
    )
}