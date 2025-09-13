```tsx
import React from 'react';
import { format } from 'date-fns';

type Task = {
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  priority?: string;
};

type TaskDetailProps = {
  task: Task;
};

const TaskDetail: React.FC<TaskDetailProps> = ({ task }) => {
  const { title, description, dueDate, completed, priority } = task;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="w-full p-4">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          {description && <p className="mt-2 text-gray-600">{description}</p>}
          <div className="mt-4">
            <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {completed ? 'Completed' : 'Pending'}
            </span>
          </div>
          {dueDate && (
            <div className="mt-2">
              <span className="text-gray-600">Due Date: </span>
              <span className="text-gray-800">{format(new Date(dueDate), 'PPP')}</span>
            </div>
          )}
          {priority && (
            <div className="mt-2">
              <span className="text-gray-600">Priority: </span>
              <span className={`text-gray-800 ${priority === 'High' ? 'font-bold' : ''}`}>{priority}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
```