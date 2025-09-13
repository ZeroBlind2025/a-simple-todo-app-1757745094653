```tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Task = {
  _id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  priority?: string;
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (err) {
        setError('Failed to load tasks');
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`p-4 border rounded-lg shadow-md ${
              task.completed ? 'bg-green-100' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <span
                className={`text-sm px-2 py-1 rounded ${
                  task.priority === 'high'
                    ? 'bg-red-500 text-white'
                    : task.priority === 'medium'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-300'
                }`}
              >
                {task.priority || 'Low'}
              </span>
            </div>
            {task.description && <p className="mt-2 text-gray-700">{task.description}</p>}
            {task.dueDate && (
              <p className="mt-2 text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            )}
            <div className="mt-2">
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold ${
                  task.completed ? 'text-green-800' : 'text-red-800'
                }`}
              >
                {task.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
```