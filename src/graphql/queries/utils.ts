import { gql } from "@apollo/client";

export const GET_THRESHOLD_SETTINGS = gql`
  query GetThresholdSettings {
    getThresholdSettings {
      thresholdType
      thresholdValue
      lastUpdated
    }
  }
`;
