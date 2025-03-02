import { gql } from "@apollo/client";

export const RECORD_TEST_RESULT = gql`
  mutation RecordTestResult($workerId: String!, $testId: String!, $score: Int!, $feedback: String) {
    recordTestResult(workerId: $workerId, testId: $testId, score: $score, feedback: $feedback) {
      id
      testId
      score
      feedback
      createdAt
    }
  }
`;
