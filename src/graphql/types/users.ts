export interface User {
    id: string;
    firstName: string;
    isEligible: boolean;
    lastName: string;
    email: string;
    role: string;
  }
  
  export interface GetAllUsersResponse {
    getAllUsers: User[];
  }
  
  export interface DeleteUserVariables {
    id: string;
  }

  export interface LoginFormInputs {
    identifier: string;
    password: string;
  }
  
  