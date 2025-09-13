```tsx
import React from 'react';

type Task = {
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  priority?: string;
};

type TaskSummaryProps = {
  tasks: Task[];
};

const TaskSummary: React.FC<TaskSummaryProps> = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks available.</p>;
  }

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Task Summary</h2>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Total Tasks:</span>
        <span className="text-gray-800 font-medium">{totalTasks}</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Completed Tasks:</span>
        <span className="text-gray-800 font-medium">{completedTasks}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Pending Tasks:</span>
        <span className="text-gray-800 font-medium">{totalTasks - completedTasks}</span>
      </div>
    </div>
  );
};

export default TaskSummary;
```