// src/graphql/mutations/mx.ts
import { gql } from "@apollo/client";

export const SUBMIT_ANSWER = gql`
  mutation SubmitAnswer($input: CreateRecordedAnswerInput!) {
    submitAnswer(input: $input)
  }
`;

export const TRIGGER_ELIGIBILITY_UPDATE = gql`
  mutation TriggerEligibilityUpdate {
    triggerEligibilityUpdate
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
