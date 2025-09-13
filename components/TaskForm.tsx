```tsx
import React, { useState } from 'react';

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (task: Task) => void;
}

interface Task {
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  priority?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit }) => {
  const [task, setTask] = useState<Task>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    dueDate: initialData?.dueDate || undefined,
    completed: initialData?.completed || false,
    priority: initialData?.priority || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.title) {
      alert('Title is required');
      return;
    }
    onSubmit(task);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="dueDate" className="block text-gray-700">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={task.dueDate ? task.dueDate.toISOString().split('T')[0] : ''}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="completed" className="block text-gray-700">
          Completed
        </label>
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={task.completed}
          onChange={handleChange}
          className="mt-1"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="priority" className="block text-gray-700">
          Priority
        </label>
        <input
          type="text"
          id="priority"
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Save Task
      </button>
    </form>
  );
};

export default TaskForm;
```