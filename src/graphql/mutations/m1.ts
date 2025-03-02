import { gql } from "@apollo/client";

export const GET_ELIGIBLE_WORKERS = gql`
  query GetEligibleWorkers($taskId: String!, $workerIds: [String!]!) {
    getEligibleWorkers(taskId: $taskId, workerIds: $workerIds)
  }
`;

export const GET_RECORDED_ANSWERS = gql`
  query GetRecordedAnswers($taskId: String!) {
    getRecordedAnswers(taskId: $taskId) {
      workerId
      answer
      createdAt
    }
  }
`;
