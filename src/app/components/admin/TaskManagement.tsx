"use client";

import { useQuery, useMutation } from "@apollo/client";
import { GET_TASKS } from "../../graphql/queries/tasks";
import { CREATE_TASK, DELETE_TASK } from "../../graphql/mutations/tasks";
import {
  GetTasksResponse,
  CreateTaskInput,
  DeleteTaskVariables,
} from "../../graphql/types/tasks";

export default function TaskManagement() {
  const { data, loading, error } = useQuery<GetTasksResponse>(GET_TASKS);
  const [createTask] = useMutation<
    { createTask: CreateTaskInput },
    { input: CreateTaskInput }
  >(CREATE_TASK);
  const [deleteTask] = useMutation<
    { deleteTask: { id: string } },
    DeleteTaskVariables
  >(DELETE_TASK);

  const handleCreateTask = async () => {
    try {
      await createTask({
        variables: {
          input: {
            title: "New Task",
            description: "Admin-only task",
            question: "What is 2 + 2?",
            nAnswers: 4,
          },
        },
      });
      alert("Task created successfully!");
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task.");
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask({ variables: { id } });
      alert("Task deleted successfully!");
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task.");
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks: {error.message}</p>;

  return (
    <div>
      <h2>Tasks</h2>
      <button onClick={handleCreateTask}>Create Task</button>
      <ul>
        {data?.getTasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.question}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
