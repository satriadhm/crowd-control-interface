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
import { ClipboardList, ClipboardPlus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

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
        <Button className="bg-[#001333]" onClick={() => setIsModalOpen(true)}>
          <ClipboardList size={16} /> Create Task
        </Button>
      </div>

      <Dialog
        open={isModalOpen}
        onOpenChange={() => setIsModalOpen(!isModalOpen)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
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
            <Textarea
              placeholder="Question"
              value={newTask.question}
              onChange={(e) =>
                setNewTask({ ...newTask, question: e.target.value })
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

      <Dialog
        open={isDetailModalOpen}
        onOpenChange={() => setIsDetailModalOpen(!isDetailModalOpen)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Task</DialogTitle>
          </DialogHeader>

          <section>
            <div className="grid grid-cols-2">
              <p className="font-semibold">Title </p>
              <p>: {selectedTask?.title}</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-semibold">Description </p>
              <p>: {selectedTask?.description}</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-semibold">Question </p>
              <p>: {selectedTask?.question}</p>
            </div>
            <p className="my-6 font-semibold">
              
            </p>
            <ul className="list-disc">
              {selectedTask?.answers.map((answer, idx) => (
                <li className="flex list-disc items-center gap-2" key={idx}>
                  <p>
                    <strong>Answer:</strong> {answer.answer ?? "-"}
                  </p>
                  <p>
                    <strong>Stats:</strong> {answer.stats ?? "-"}
                  </p>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => setIsDetailModalOpen(false)}
              className="mt-8 w-full"
            >
              Close
            </Button>
          </section>
        </DialogContent>
      </Dialog>

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
      </div>
    </div>
  );
}
