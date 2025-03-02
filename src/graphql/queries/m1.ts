import { gql } from "@apollo/client";

export const ASSIGN_TASK = gql`
  mutation AssignTask($taskId: String!, $workerId: String!) {
    assignTask(taskId: $taskId, workerId: $workerId)
  }
`;

export const SUBMIT_ANSWER = gql`
  mutation SubmitAnswer($taskId: String!, $answer: String!) {
    submitAnswer(taskId: $taskId, answer: $answer)
  }
`;
