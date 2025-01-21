"use client";

import { GET_TASKS, GET_TASK_BY_ID } from "@/app/graphql/queries/tasks";
import { CREATE_TASK, DELETE_TASK } from "@/app/graphql/mutations/tasks";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";

// Define types for tasks
type Task = {
  id: string;
  title: string;
  description: string;
  question: string;
  answers: { answer: string; stats: number }[];
};

export default function TaskManagement() {
  const { data, loading, error, refetch } = useQuery<{ getTasks: Task[] }>(GET_TASKS);
  const [getTaskById, { data: taskDetailData }] = useLazyQuery<{ getTaskById: Task }>(GET_TASK_BY_ID);
  const [createTask] = useMutation(CREATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    question: "",
    answers: [{ answer: "", stats: 0 }],
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleCreateTask = async () => {
    try {
      await createTask({ variables: { input: newTask } });
      alert("Task created successfully!");
      refetch();
      setNewTask({
        id: "",
        title: "",
        description: "",
        question: "",
        answers: [{ answer: "", stats: 0 }],
      });
      setIsModalOpen(false);
    } catch (err) {
      alert("Error creating task: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask({ variables: { id } });
      alert("Task deleted successfully!");
      refetch();
    } catch (err) {
      alert("Error deleting task: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  const handleGetTaskById = async (id: string) => {
    try {
      await getTaskById({ variables: { id } });
      if (taskDetailData?.getTaskById) {
        setSelectedTask(taskDetailData.getTaskById);
        setIsDetailModalOpen(true);
      }
    } catch (err) {
      alert("Error fetching task details: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-500"
          onClick={() => setIsModalOpen(true)}
        >
          Create Task
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Create New Task</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full p-3 mb-3 border rounded"
            />
            <textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full p-3 mb-3 border rounded"
            />
            <textarea
              placeholder="Question"
              value={newTask.question}
              onChange={(e) => setNewTask({ ...newTask, question: e.target.value })}
              className="w-full p-3 mb-3 border rounded"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {isDetailModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Task Details</h2>
            <p><strong>Title:</strong> {selectedTask.title}</p>
            <p><strong>Description:</strong> {selectedTask.description}</p>
            <p><strong>Question:</strong> {selectedTask.question}</p>
            <button
              onClick={() => setIsDetailModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Task List</h2>
        <ul className="space-y-4">
          {data?.getTasks.map((task) => (
            <li key={task.id} className="p-4 border rounded flex justify-between items-center">
              <div>
                <p className="font-bold">{task.title}</p>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleGetTaskById(task.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
                >
                  View
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
