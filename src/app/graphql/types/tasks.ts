export interface Task {
  id: string;
  title: string;
  description?: string;
  question: string;
  answers: Answer[];
}

export interface Answer {
  workerId: string;
  answer: string;
  stats: string;
}

export interface GetTasksResponse {
  getTasks: Task[];
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  question: string;
  answers: string[];
}

export interface DeleteTaskVariables {
  id: string;
}
