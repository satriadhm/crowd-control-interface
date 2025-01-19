'use client';

import { useQuery, useMutation } from '@apollo/client';
import { GET_TASKS } from '../../graphql/queries/tasks';
import { CREATE_TASK, DELETE_TASK } from '../../graphql/mutations/tasks';
import { GetTasksResponse, CreateTaskInput, DeleteTaskVariables } from '../../graphql/types/tasks';

export default function TaskManagement() {
  const { data, loading, error } = useQuery<GetTasksResponse>(GET_TASKS);
  const [createTask] = useMutation<{ createTask: CreateTaskInput }, { input: CreateTaskInput }>(CREATE_TASK);
  const [deleteTask] = useMutation<{ deleteTask: { id: string } }, DeleteTaskVariables>(DELETE_TASK);

  const handleCreateTask = async () => {
    await createTask({
      variables: {
        input: {
          title: 'New Task',
          description: 'This is a new task',
          question: 'What is the answer?',
          nAnswers: 4,
        },
      },
    });
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask({ variables: { id } });
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks: {error.message}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <button
        onClick={handleCreateTask}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
      >
        Create Task
      </button>
      <ul>
        {data?.getTasks.map((task) => (
          <li key={task.id} className="mb-4">
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description || 'No description provided'}</p>
            <p className="text-lg">{task.question}</p>
            <p>Answers:</p>
            <ul className="pl-4">
              {task.answers.map((answer, index) => (
                <li key={index} className="text-sm">
                  Worker: {answer.workerId}, Answer: {answer.answer}, Stats: {answer.stats}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="mt-2 px-4 py-1 bg-red-600 text-white rounded"
            >
              Delete Task
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
