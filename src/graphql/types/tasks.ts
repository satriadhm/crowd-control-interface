export interface Task {
  id: string;
  title: string;
  description: string;
  question: string;
  isValidQuestion: boolean;
  answers: Array<{
    answer: string;
    stats: number | null;
  }>;
}

export interface EditProfileFormInputs {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address1: string;
  address2: string;
}



export interface Answer {
  workerId: string[];
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
  answers: AnswerTaskInput[];
}

export interface AnswerTaskInput {
  answer: string;
}

export interface DeleteTaskVariables {
  id: string;
}
