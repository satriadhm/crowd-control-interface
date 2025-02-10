"use client";

import { GET_TASKS, GET_TASK_BY_ID } from "@/graphql/queries/tasks";
import { CREATE_TASK, DELETE_TASK } from "@/graphql/mutations/tasks";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ClipboardList, Trash2 } from "lucide-react";

type Task = {
  id: string;
  title: string;
  description: string;
  question: string;
  answers: { answer: string; stats: number }[];
};

type CreateTask = {
  title: string;
  description: string;
  question: string;
  answers: { answer: string }[];
};

export default function TaskManagement() {
  const { data, refetch } = useQuery<{ getTasks: Task[] }>(GET_TASKS);
  const [getTaskById, { data: taskDetailData }] = useLazyQuery<{
    getTaskById: Task;
  }>(GET_TASK_BY_ID);
  const [createTask] = useMutation(CREATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  console.log({ data });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<CreateTask>({
    title: "",
    description: "",
    question: "",
    answers: [{ answer: "" }],
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleCreateTask = async () => {
    try {
      await createTask({ variables: { input: newTask } });
      alert("Task created successfully!");
      refetch();
      setNewTask({
        title: "",
        description: "",
        question: "",
        answers: [{ answer: "" }],
      });
      setIsModalOpen(false);
    } catch (err) {
      alert(
        "Error creating task: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask({ variables: { id } });
      alert("Task deleted successfully!");
      refetch();
    } catch (err) {
      alert(
        "Error deleting task: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
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
      alert(
        "Error fetching task details: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-end items-center mb-6">
        <button
          className="px-4 flex items-center gap-2 py-2 bg-[#001333] text-white rounded shadow"
          onClick={() => setIsModalOpen(true)}
        >
          <ClipboardList size={16} /> Create Task
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
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="w-full p-3 mb-3 border rounded"
            />
            <textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="w-full p-3 mb-3 border rounded"
            />
            <textarea
              placeholder="Question"
              value={newTask.question}
              onChange={(e) =>
                setNewTask({ ...newTask, question: e.target.value })
              }
              className="w-full p-3 mb-3 border rounded"
            />
            {newTask.answers.map((answer, idx) => (
              <div key={idx} className="mb-3">
                <input
                  type="text"
                  placeholder="Answer"
                  value={answer.answer}
                  onChange={(e) => {
                    const updatedAnswers = [...newTask.answers];
                    updatedAnswers[idx].answer = e.target.value;
                    setNewTask({ ...newTask, answers: updatedAnswers });
                  }}
                  className="w-full p-3 mb-3 border rounded"
                />

                <button
                  onClick={() => {
                    const updatedAnswers = newTask.answers.filter(
                      (_, index) => index !== idx
                    );
                    setNewTask({ ...newTask, answers: updatedAnswers });
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                >
                  Remove Answer
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                setNewTask({
                  ...newTask,
                  answers: [...newTask.answers, { answer: "" }],
                })
              }
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
            >
              Add Answer
            </button>
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
            <p>
              <strong>Title:</strong> {selectedTask.title}
            </p>
            <p>
              <strong>Description:</strong> {selectedTask.description}
            </p>
            <p>
              <strong>Question:</strong> {selectedTask.question}
            </p>
            {/* make a section for creating the answer too */}
            <ul>
              {selectedTask.answers.map((answer, idx) => (
                <li key={idx}>
                  <p>
                    <strong>Answer:</strong> {answer.answer}
                  </p>
                  <p>
                    <strong>Stats:</strong> {answer.stats}
                  </p>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsDetailModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-6 border rounded shadow">
        <Table>
          <TableCaption>A list of task.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-primary">
                Title
              </TableHead>
              <TableHead className="font-semibold text-primary">
                Description
              </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.getTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  <span>{task.description}</span>
                </TableCell>
                <TableCell className="text-right space-x-2">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
