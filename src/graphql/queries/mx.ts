import { gql } from "@apollo/client";

export const GET_ELIGIBILITY_HISTORY = gql`
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

export const GET_TASK_RESULTS = gql`
  query GetTestResults {
    getTestResults {
      id
      workerId
      testId
      score
      feedback
      eligibilityStatus
      createdAt
      formattedDate
    }
  }
`;

export const GET_WORKER_ANALYSIS = gql`
  query GetTesterAnalysis {
    getTesterAnalysis {
      workerId
      testerName
      averageScore
      accuracy
      isEligible
    }
  }
`;

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

export const GET_ALGORITHM_PERFORMANCE = gql`
  query GetAlgorithmPerformance {
    getAlgorithmPerformance {
      month
      accuracyRate
      responseTime
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
      eligibilityStatus
      createdAt
      formattedDate
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
      isEligible
    }
  }
`;

export const GET_DASHBOARD_SUMMARY = gql`
  query GetDashboardSummary {
    getDashboardSummary {
      iterationMetrics {
        iteration
        workers
        tasks
      }
      workerEligibility {
        name
        value
      }
      taskValidation {
        name
        value
      }
      accuracyDistribution {
        name
        value
      }
    }
  }
`;
