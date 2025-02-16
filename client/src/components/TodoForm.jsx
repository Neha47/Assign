import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/TodoSlice';

export default function TodoForm(){

    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        //e.preventDefault();
        if (title) {
            dispatch(addTodo(title));
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Add a todo" 
                className="border p-2 rounded w-full"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2 w-full">Add</button>
        </form>
    );
};