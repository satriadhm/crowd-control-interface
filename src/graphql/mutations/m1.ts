import { gql } from "@apollo/client";


export const RECORD_TASK_RESULT = gql`
  mutation RecordTaskResult($workerId: String!, $testId: String!, $score: Int!, $feedback: String) {
    RecordTaskResult(workerId: $workerId, testId: $testId, score: $score, feedback: $feedback) {
      id
      testId
      score
      feedback
      createdAt
    }
  }
`;


export const SUBMIT_ANSWER = gql`
  mutation SubmitAnswer($taskId: String!, $answer: String!) {
    submitAnswer(taskId: $taskId, answer: $answer)
  }
`;
