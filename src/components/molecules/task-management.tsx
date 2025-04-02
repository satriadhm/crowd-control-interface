"use client";

import { GET_TASKS, GET_TASK_BY_ID } from "@/graphql/queries/tasks";
import { CREATE_TASK, DELETE_TASK } from "@/graphql/mutations/tasks";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ClipboardList, ClipboardPlus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { CreateTask, Task } from "@/graphql/types/tasks";

export default function TaskManagement() {
  const { data, refetch } = useQuery<{ getTasks: Task[] }>(GET_TASKS);
  const [getTaskById, { data: taskDetailData }] = useLazyQuery<{
    getTaskById: Task;
  }>(GET_TASK_BY_ID);
  const [createTask] = useMutation(CREATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<CreateTask>({
    title: "",
    description: "",
    question: {
      scenario: "",
      given: "",
      when: "",
      then: "",
    },
    answers: [{ answer: "" }],
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Adjust the number of tasks per page as needed

  const tasks: Task[] = data?.getTasks || [];
  const totalPages = Math.ceil(tasks.length / pageSize);
  const paginatedTasks = tasks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Reset current page if tasks change
  useEffect(() => {
    setCurrentPage(1);
  }, [data?.getTasks]);

  const handleCreateTask = async () => {
    try {
      await createTask({ variables: { input: newTask } });
      alert("Task created successfully!");
      refetch();
      setNewTask({
        title: "",
        description: "",
        question: {
          scenario: "",
          given: "",
          when: "",
          then: "",
        },
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

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-end items-center mb-6">
        <Button className="bg-[#001333]" onClick={() => setIsModalOpen(true)}>
          <ClipboardList size={16} /> Create Task
        </Button>
      </div>

      {/* Create Task Modal */}
      <Dialog
        open={isModalOpen}
        onOpenChange={() => setIsModalOpen(!isModalOpen)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-6">
            <Input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <Textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Scenario"
              value={newTask.question.scenario}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  question: { ...newTask.question, scenario: e.target.value },
                })
              }
            />
            <Input
              type="text"
              placeholder="Given"
              value={newTask.question.given}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  question: { ...newTask.question, given: e.target.value },
                })
              }
            />
            <Input
              type="text"
              placeholder="When"
              value={newTask.question.when}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  question: { ...newTask.question, when: e.target.value },
                })
              }
            />
            <Input
              type="text"
              placeholder="Then"
              value={newTask.question.then}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  question: { ...newTask.question, then: e.target.value },
                })
              }
            />

            {newTask.answers.map((answer, idx) => (
              <div key={idx} className="mb-3 gap-2 flex items-center">
                <Input
                  type="text"
                  placeholder={`Answer - ${idx + 1}`}
                  value={answer.answer}
                  onChange={(e) => {
                    const updatedAnswers = [...newTask.answers];
                    updatedAnswers[idx].answer = e.target.value;
                    setNewTask({ ...newTask, answers: updatedAnswers });
                  }}
                />
                <Button
                  variant="destructive"
                  onClick={() => {
                    const updatedAnswers = newTask.answers.filter(
                      (_, index) => index !== idx
                    );
                    setNewTask({ ...newTask, answers: updatedAnswers });
                  }}
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
            <Button
              onClick={() =>
                setNewTask({
                  ...newTask,
                  answers: [...newTask.answers, { answer: "" }],
                })
              }
            >
              <ClipboardPlus size={16} /> Add Answer
            </Button>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </Button>
              <Button onClick={handleCreateTask}>Create</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Task Details Modal */}
      <Dialog
        open={isDetailModalOpen}
        onOpenChange={() => setIsDetailModalOpen(!isDetailModalOpen)}
      >
        <DialogContent className="max-w-5xl w-full">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Task Details
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex space-x-8">
            <div className="w-1/2 border-r border-gray-300 pr-4">
              <table className="min-w-full border-collapse">
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 font-semibold w-32">Title</td>
                    <td className="py-2 px-4">{selectedTask?.title}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 font-semibold">Description</td>
                    <td className="py-2 px-4">{selectedTask?.description}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 font-semibold">Scenario</td>
                    <td className="py-2 px-4">
                      {selectedTask?.question?.scenario}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 font-semibold">Given</td>
                    <td className="py-2 px-4">
                      {selectedTask?.question?.given}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 font-semibold">When</td>
                    <td className="py-2 px-4">
                      {selectedTask?.question?.when}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300 bg-blue-50">
                    <td className="py-2 px-4 font-semibold text-blue-800">
                      Then
                    </td>
                    <td className="py-2 px-4 text-blue-800">
                      {selectedTask?.question?.then}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-1/2">
              <h3 className="text-xl font-semibold mb-3">Answers</h3>
              <div className="max-h-96 overflow-y-hidden hover:overflow-y-auto transition-all duration-300">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="py-2 px-4 text-left">Answer</th>
                      <th className="py-2 px-4 text-left">Stats</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTask?.answers.map((answer, idx) => (
                      <tr key={idx} className="border-b border-gray-300">
                        <td className="py-2 px-4">{answer.answer ?? "-"}</td>
                        <td className="py-2 px-4">{answer.stats ?? "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button
              onClick={() => setIsDetailModalOpen(false)}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Task List Table with Pagination */}
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
              <TableHead className="font-semibold text-primary">
                Status
              </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  <span>{task.description}</span>
                </TableCell>
                <TableCell>
                  {task.isValidQuestion ? (
                    <span className="flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full bg-green-600 mr-2"></span>
                      <span className="text-green-600 font-semibold">
                        Valid
                      </span>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full bg-red-600 mr-2"></span>
                      <span className="text-red-600 font-semibold">
                        Invalid
                      </span>
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2 flex items-center justify-end">
                  <Button
                    onClick={() => handleGetTaskById(task.id)}
                    className="bg-[#0a1e5e]"
                  >
                    View
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
