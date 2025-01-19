export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string; // Add the role field as it's often part of user management
  }
  
  export interface GetAllUsersResponse {
    getAllUsers: User[];
  }
  
  export interface DeleteUserVariables {
    id: string;
  }
  