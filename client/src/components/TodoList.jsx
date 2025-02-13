import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, deleteTodo, updateTodo } from '../redux/TodoSlice';

export default function TodoList() {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.items);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Todo List</h2>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} className="flex justify-between items-center p-2 border-b">
                        {todo.task}
                        {(todo.status == 1) ? <span> Completed </span> : <span> Pending </span>}
                        <button 
                            onClick={() => dispatch(updateTodo(todo.id))} 
                            className="text-emerald-600"
                        >Update</button>
                        <button 
                            onClick={() => dispatch(deleteTodo(todo.id))} 
                            className="text-red-500"
                        >Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};