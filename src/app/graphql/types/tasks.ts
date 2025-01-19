export interface Answer {
    workerId: string;
    answer: string;
    stats: number;
  }
  
  export interface Task {
    id: string;
    title: string;
    description?: string;
    question: string;
    nAnswers: number;
    answers: Answer[];
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
  