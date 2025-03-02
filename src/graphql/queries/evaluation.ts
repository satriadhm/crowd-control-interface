import { gql } from "@apollo/client";

export const GET_TEST_HISTORY = gql`
  query GetTestHistory($workerId: String!) {
    getTestHistory(workerId: $workerId) {
      id
      testId
      score
      feedback
      createdAt
    }
  }
`;

export const GET_TEST_RESULTS = gql`
  query GetTestResults {
    getTestResults {
      id
      workerId
      testId
      score
      feedback
      createdAt
    }
  }
`;

export const GET_TESTER_ANALYSIS = gql`
  query GetTesterAnalysis {
    getTesterAnalysis {
      workerId
      testerName
      averageScore
      accuracy
    }
  }
`;
