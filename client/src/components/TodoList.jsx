import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodo, updateTodo } from "../redux/TodoSlice";

export default function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
        📋 My Todo List
      </h2>
      <ul className="divide-y divide-gray-300">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li
              key={todo._id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 transition hover:bg-gray-100"
            >
              <div className="flex-1">
                <span className="text-lg sm:text-xl font-medium text-gray-700">
                  {todo.task}
                </span>
                <span
                  className={`block sm:inline text-sm font-semibold mt-1 sm:mt-0 sm:ml-3 ${
                    todo.status ? "text-green-500" : "text-yellow-500"
                  }`}
                >
                  {todo.status ? "✅ Completed" : "⌛ Pending"}
                </span>
              </div>
              <div className="flex gap-2 mt-3 sm:mt-0">
                <button
                  onClick={() => dispatch(updateTodo(todo._id))}
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => dispatch(deleteTodo(todo._id))}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">
            No tasks available. Start adding some! 🚀
          </p>
        )}
      </ul>
    </div>
  );
}
