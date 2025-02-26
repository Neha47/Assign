import { Provider } from 'react-redux';
import {store} from '../redux/store';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

export default function Home() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token) {
        alert("You need to login first");
        window.location.href = "/";
    }

    // if(!localStorage.getItem("token")){
    //     alert("You need to login first");
    //     window.location.href = "/";
    // }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/";
    };

    return (
        <Provider store={store}>
            <div className="flex flex-col items-end p-5 bg-gray-200 w-full">
                <h1 className="text-lg font-semibold text-gray-800"> Hey !! {username}</h1>
                <button onClick={handleLogout} className="mt-2 px-4 py-2 text-white bg-black rounded-xl">Log Out</button>
            </div>
            <div className="max-w-md mx-auto mt-10">
                <h1 className="text-2xl font-bold text-center">Todo List</h1>
                <TodoForm />
                <TodoList />
            </div>
        </Provider>
    )
}