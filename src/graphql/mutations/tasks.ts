import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      title
      description
      question
      nAnswers
      answers {
        answer
      }
    }
  }
`;

export const GET_ALL_TASKS = gql`
  query GetAllTasks {
    getTasks {
      id
      title
      description
      question
      nAnswers
      answers {
        answer
      }
    }
  }
`;

export const GET_TASK_BY_ID = gql`
  query GetTaskById($id: String!) {
    getTaskById(id: $id) {
      id
      title
      description
      question
      nAnswers
      answers {
        answer
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id) {
      id
      title
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: String!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      title
      description
      question
      nAnswers
      answers {
        answer
      }
    }
  }
`;