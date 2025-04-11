export interface Task {
  id: string;
  title: string;
  description: string;
  question: {
    scenario: string;
    given: string;
    when: string;
    then: string;
  };
  isValidQuestion: boolean;
  answers: Array<{
    answerId: number;
    answer: string;
    stats: number | null;
  }>;
}

export type CreateTask = {
  title: string;
  description: string;
  question: {
    scenario: string;
    given: string;
    when: string;
    then: string;
  };
  answers: { answer: string }[];
};

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

export interface AnsweredTask {
  taskId: string;
  answer: string;
  stats: string;
}

export interface CreateRecordedAnswerInput {
  taskId: string;
  answer: string;
  answerId: number;
}
