'use client';

import { useQuery, useMutation } from '@apollo/client';
import { GET_TASKS } from '../../graphql/queries/tasks';
import { CREATE_TASK, DELETE_TASK } from '../../graphql/mutations/tasks';
import { GetTasksResponse, CreateTaskInput, DeleteTaskVariables } from '../../graphql/types/tasks';

export default function TaskManagement() {
  const { data, loading, error, refetch } = useQuery<GetTasksResponse>(GET_TASKS);
  const [createTask] = useMutation<{ createTask: CreateTaskInput }, { input: CreateTaskInput }>(CREATE_TASK);
  const [deleteTask] = useMutation<{ deleteTask: { id: string } }, DeleteTaskVariables>(DELETE_TASK);

  const handleCreateTask = async () => {
    try {
      await createTask({
        variables: {
          input: {
            title: 'New Task',
            description: 'Task created by admin',
            question: 'What is 2 + 2?',
            nAnswers: 4,
          },
        },
      });
      alert('Task created successfully!');
      refetch(); // Refresh task list after creation
    } catch (err) {
      console.error('Error creating task:', err);
      alert('Failed to create task.');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask({ variables: { id } });
      alert('Task deleted successfully!');
      refetch(); // Refresh task list after deletion
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('Failed to delete task.');
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) {
    console.error('Error loading tasks:', error);
    return <p>Error loading tasks: {error.message}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <button
        onClick={handleCreateTask}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
      >
        Create Task
      </button>
      <ul className="list-disc pl-6">
        {data?.getTasks.map((task) => (
          <li key={task.id} className="mb-4">
            <div>
              <strong className="block text-lg">{task.title}</strong>
              <p className="text-sm text-gray-600">{task.description || 'No description provided'}</p>
              <p className="text-sm">{task.question}</p>
            </div>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="mt-2 px-4 py-1 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
