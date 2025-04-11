import { gql } from "@apollo/client";


export const SUBMIT_ANSWER = gql`
  mutation SubmitAnswer($input: CreateRecordedAnswerInput!) {
    submitAnswer(input: $input)
  }
`;