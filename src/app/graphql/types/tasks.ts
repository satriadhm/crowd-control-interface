export interface Task {
  id: string;
  title: string;
  description?: string;
  question: string;
  nAnswers: number;
}

export interface GetTasksResponse {
  getTasks: Task[];
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  question: string;
  nAnswers: number;
}

export interface DeleteTaskVariables {
  id: string;
}
