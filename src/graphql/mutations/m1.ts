import { gql } from "@apollo/client";


export const SUBMIT_ANSWER = gql`
  mutation SubmitAnswer($taskId: String!, $answer: String!, $answerId: Number!) {
    submitAnswer(taskId: $taskId, answer: $answer)
  }
`;
