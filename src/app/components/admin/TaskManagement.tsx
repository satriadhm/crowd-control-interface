import { CREATE_TASK, DELETE_TASK } from "@/app/graphql/mutations/tasks";
import { GET_TASKS } from "@/app/graphql/queries/tasks";
import {
  GetTasksResponse,
  CreateTaskInput,
  DeleteTaskVariables,
} from "@/app/graphql/types/tasks";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

export default function TaskManagement() {
  const { data, loading, error, refetch } =
    useQuery<GetTasksResponse>(GET_TASKS);
  const [createTask] = useMutation<
    { createTask: CreateTaskInput },
    { input: CreateTaskInput }
  >(CREATE_TASK);
  const [deleteTask] = useMutation<
    { deleteTask: { id: string } },
    DeleteTaskVariables
  >(DELETE_TASK);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    question: "",
    answers: [{ answer: "", stats: 0 }],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTask = async () => {
    if (!newTask.title || !newTask.question) {
      alert("Title and Question are required!");
      return;
    }
    try {
      await createTask({
        variables: {
          input: newTask,
        },
      });
      alert("Task created successfully!");
      refetch();
      setNewTask({
        title: "",
        description: "",
        question: "",
        answers: [{ answer: "", stats: 0 }],
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task.");
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask({ variables: { id } });
      alert("Task deleted successfully!");
      refetch();
    } catch (err) {
      console.error("Error deleting task:", err);
      alert(`Failed to delete task: ${(err as Error).message}`);
    }
  };

  const handleAnswerChange = (index: number, field: string, value: string | number) => {
    const updatedAnswers = [...newTask.answers];
    updatedAnswers[index] = { ...updatedAnswers[index], [field]: value };
    setNewTask({ ...newTask, answers: updatedAnswers });
  };

  const addAnswerField = () => {
    setNewTask({ ...newTask, answers: [...newTask.answers, { answer: "", stats: 0 }] });
  };

  const removeAnswerField = (index: number) => {
    const updatedAnswers = newTask.answers.filter((_, i) => i !== index);
    setNewTask({ ...newTask, answers: updatedAnswers });
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-500"
        >
          Create Task
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h3 className="text-xl font-bold mb-4">Create New Task</h3>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="block w-full p-3 mb-3 border rounded focus:ring focus:ring-blue-300"
            />
            <textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="block w-full p-3 mb-3 border rounded focus:ring focus:ring-blue-300"
            />
            <textarea
              placeholder="Question"
              value={newTask.question}
              onChange={(e) =>
                setNewTask({ ...newTask, question: e.target.value })
              }
              className="block w-full p-3 mb-3 border rounded focus:ring focus:ring-blue-300"
            />
            <h4 className="font-semibold mb-2">Answers</h4>
            {newTask.answers.map((answer, index) => (
              <div key={index} className="flex items-center mb-3">
                <input
                  type="text"
                  placeholder="Answer"
                  value={answer.answer}
                  onChange={(e) => handleAnswerChange(index, "answer", e.target.value)}
                  className="block w-full p-3 border rounded focus:ring focus:ring-blue-300 mr-2"
                />
                <input
                  type="number"
                  placeholder="Stats"
                  value={answer.stats}
                  onChange={(e) => handleAnswerChange(index, "stats", Number(e.target.value))}
                  className="block w-1/4 p-3 border rounded focus:ring focus:ring-blue-300"
                />
                <button
                  onClick={() => removeAnswerField(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded shadow hover:bg-red-400"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={addAnswerField}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-400 mb-4"
            >
              Add Answer
            </button>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded shadow hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-400"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Task List</h3>
        {data?.getTasks.map((task) => (
          <div key={task.id} className="mb-6">
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              {task.title}
            </h4>
            <p className="text-gray-600 mb-2">
              <strong>Description:</strong> {task.description || "N/A"}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Question:</strong> {task.question}
            </p>
            <h5 className="text-lg font-semibold text-gray-700 mb-3">
              Answers:
            </h5>
            <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Answer</th>
                  <th className="border border-gray-300 p-2">Stats</th>
                </tr>
              </thead>
              <tbody>
                {task.answers && task.answers.length > 0 ? (
                  task.answers.map((answer, idx) => (
                    <tr key={idx} className="text-center">
                      <td className="border border-gray-300 p-2">
                        {answer?.answer || "No Answer Provided"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {answer?.stats || "No Stats Available"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="border border-gray-300 p-2 text-center text-gray-500"
                    >
                      No answers available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-400"
            >
              Delete Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
