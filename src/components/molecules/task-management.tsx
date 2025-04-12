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
import {
  ClipboardList,
  ClipboardPlus,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { CreateTask, Task } from "@/graphql/types/tasks";

export default function TaskManagement() {
  const { data, loading, error, refetch } = useQuery<{ getTasks: Task[] }>(
    GET_TASKS
  );
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white/10 rounded-lg shadow-lg text-center">
        <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
        <p className="text-white">Error loading tasks: {error.message}</p>
        <Button onClick={() => refetch()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Task Management</h1>
        <Button
          className="flex items-center gap-2 bg-gradient-to-r from-tertiary to-tertiary-light text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          <ClipboardPlus size={16} />
          Create Task
        </Button>
      </div>

      {/* Create Task Modal */}
      <Dialog
        open={isModalOpen}
        onOpenChange={() => setIsModalOpen(!isModalOpen)}
      >
        <DialogContent className="bg-[#0a1e5e] text-white border border-white/20 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Create New Task
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-6">
            <Input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="bg-white/10 border-white/20 text-white"
            />
            <Textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="bg-white/10 border-white/20 text-white"
            />

            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <h3 className="text-md font-semibold mb-3">
                Question Format (Gherkin)
              </h3>
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
                className="bg-white/10 border-white/20 text-white mb-2"
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
                className="bg-white/10 border-white/20 text-white mb-2"
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
                className="bg-white/10 border-white/20 text-white mb-2"
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
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <h3 className="text-md font-semibold mb-3">Possible Answers</h3>
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
                    className="bg-white/10 border-white/20 text-white"
                  />
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (newTask.answers.length > 1) {
                        const updatedAnswers = newTask.answers.filter(
                          (_, index) => index !== idx
                        );
                        setNewTask({ ...newTask, answers: updatedAnswers });
                      } else {
                        alert("Task must have at least one answer option.");
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700"
                    disabled={newTask.answers.length <= 1}
                  >
                    <Trash2 size={16} />
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
                className="w-full mt-2 bg-white/10 hover:bg-white/20 border border-white/20"
              >
                <ClipboardPlus size={16} className="mr-2" /> Add Answer Option
              </Button>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateTask}
                className="bg-gradient-to-r from-tertiary to-tertiary-light text-white hover:shadow-lg"
                disabled={
                  !newTask.title ||
                  !newTask.question.scenario ||
                  newTask.answers.some((a) => !a.answer)
                }
              >
                Create Task
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Task Details Modal */}
      <Dialog
        open={isDetailModalOpen}
        onOpenChange={() => setIsDetailModalOpen(!isDetailModalOpen)}
      >
        <DialogContent className="bg-[#0a1e5e] text-white border border-white/20 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Task Details
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex flex-col md:flex-row md:space-x-8">
            <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-white/20 pb-4 md:pb-0 md:pr-4">
              <div className="bg-white/10 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold mb-2 text-tertiary-light">
                  Basic Information
                </h3>
                <p className="mb-2">
                  <span className="font-semibold">Title:</span>{" "}
                  {selectedTask?.title}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Description:</span>{" "}
                  {selectedTask?.description || "No description provided"}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                      selectedTask?.isValidQuestion
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {selectedTask?.isValidQuestion ? (
                      <>
                        <CheckCircle size={14} className="mr-1" /> Valid
                      </>
                    ) : (
                      <>
                        <XCircle size={14} className="mr-1" /> Not Validated
                      </>
                    )}
                  </span>
                </p>
              </div>

              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-tertiary-light">
                  Question Format
                </h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Scenario:</span>{" "}
                    {selectedTask?.question?.scenario}
                  </p>
                  <p>
                    <span className="font-semibold">Given:</span>{" "}
                    {selectedTask?.question?.given}
                  </p>
                  <p>
                    <span className="font-semibold">When:</span>{" "}
                    {selectedTask?.question?.when}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-400">Then:</span>{" "}
                    <span className="text-blue-400">
                      {selectedTask?.question?.then}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <div className="bg-white/10 p-4 rounded-lg h-full">
                <h3 className="text-lg font-semibold mb-4 text-tertiary-light">
                  Answer Options
                </h3>
                <div className="max-h-96 overflow-y-auto pr-2">
                  <table className="w-full">
                    <thead className="border-b border-white/20">
                      <tr>
                        <th className="py-2 px-3 text-left text-sm font-semibold">
                          #
                        </th>
                        <th className="py-2 px-3 text-left text-sm font-semibold">
                          Answer
                        </th>
                        <th className="py-2 px-3 text-left text-sm font-semibold">
                          Stats
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTask?.answers.map((answer, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-white/10 hover:bg-white/5"
                        >
                          <td className="py-3 px-3">{idx + 1}</td>
                          <td className="py-3 px-3">{answer.answer ?? "-"}</td>
                          <td className="py-3 px-3">{answer.stats ?? "-"}</td>
                        </tr>
                      ))}
                      {selectedTask?.answers.length === 0 && (
                        <tr>
                          <td
                            colSpan={3}
                            className="py-4 text-center text-gray-400"
                          >
                            No answers available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => setIsDetailModalOpen(false)}
              className="bg-gradient-to-r from-tertiary to-tertiary-light text-white hover:shadow-lg"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Task List Table with Pagination */}
      <div className="bg-white/10 p-6 rounded-lg shadow-lg">
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <ClipboardList className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-300 mb-4">No tasks found</p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-tertiary to-tertiary-light text-white"
            >
              Create Your First Task
            </Button>
          </div>
        ) : (
          <>
            <Table>
              <TableCaption>
                A list of tasks ({tasks.length} total)
              </TableCaption>
              <TableHeader className="bg-white/5">
                <TableRow>
                  <TableHead className="font-semibold text-white">
                    Title
                  </TableHead>
                  <TableHead className="font-semibold text-white">
                    Description
                  </TableHead>
                  <TableHead className="font-semibold text-white">
                    Status
                  </TableHead>
                  <TableHead className="text-right text-white">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTasks.map((task) => (
                  <TableRow
                    key={task.id}
                    className="border-b border-white/10 hover:bg-white/5"
                  >
                    <TableCell className="font-medium text-white">
                      {task.title}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <span>{task.description || "-"}</span>
                    </TableCell>
                    <TableCell>
                      {task.isValidQuestion ? (
                        <span className="flex items-center">
                          <span className="inline-block w-3 h-3 rounded-full bg-green-600 mr-2"></span>
                          <span className="text-green-500 font-semibold">
                            Valid
                          </span>
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <span className="inline-block w-3 h-3 rounded-full bg-red-600 mr-2"></span>
                          <span className="text-red-500 font-semibold">
                            Not Validated
                          </span>
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2 flex items-center justify-end">
                      <Button
                        onClick={() => handleGetTaskById(task.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        View
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteTask(task.id)}
                        size="sm"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6">
                <Button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white disabled:opacity-50"
                >
                  Previous
                </Button>
                <span className="text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white disabled:opacity-50"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
