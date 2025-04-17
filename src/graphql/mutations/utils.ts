import { gql } from "@apollo/client";

export const UPDATE_THRESHOLD_SETTINGS = gql`
  mutation UpdateThresholdSettings($input: ThresholdSettingsInput!) {
    updateThresholdSettings(input: $input) {
      thresholdType
      thresholdValue
      lastUpdated
    }
  }
`;
