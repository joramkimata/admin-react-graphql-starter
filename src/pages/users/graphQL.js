import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
    query getAllUsers {
        getAllUsers {
            uuid
            createdAt
            fullName
            email
            userType
            active
        }
    }
`;

export const CREATE_USERS = gql`
mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    code
    data {
      uuid
      fullName
      email
      userType
    }
    status
    errorDescription
  }
}
`;

export const UPDATE_USER = gql`
mutation updateUser($uuid: String!, $input: UpdateUserInput!) {
  updateUser(uuid: $uuid, userInput: $input) {
    code
    data {
      uuid
      fullName
      email
      userType
    }
    status
    errorDescription
  }
}
`;

export const DELETE_USER = gql`
mutation deleteUser($uuid: String!) {
  deleteUser(uuid: $uuid) {
    code
    data {
      uuid
      fullName
      email
      userType
    }
    status
    errorDescription
  }
}
`;

export const BLOCK_USER = gql`
mutation blockUser($uuid: String!) {
  blockUser(uuid: $uuid) {
    code
    data {
      uuid
    }
    status
    errorDescription
  }
}
`;

export const ACTIVATE_USER = gql`
mutation activateUser($uuid: String!) {
  activateUser(uuid: $uuid) {
    code
    data {
      uuid
    }
    status
    errorDescription
  }
}
`;

export const CHANGE_PASSWORD = gql`
mutation changeUserPassword(
  $uuid: String!
  $password: String!
  $confirmPassword: String!
) {
  changeUserPassword(
    uuid: $uuid
    password: $password
    confirmPassword: $confirmPassword
  ) {
    code
    data {
      uuid
    }
    status
    errorDescription
  }
}
`;

export const GET_USER_INFO = gql`
query getUser($uid: String!) {
  getUser(uid: $uid) {
    uuid
    fullName
    email
    userType
    roles {
      uuid
      name
      displayName
      permissions {
        uuid
        name
      }
    }
  }
  getRoles {
      uuid
      name
      displayName
  }
}
`;

export const GET_ALL_ROLES = gql`
  query getRoles {
    getRoles {
      uuid
      name
      displayName
    }
  }
`;

export const ASSIGN_ROLES = gql`
mutation assignRoles($input: AssignRolesInput!) {
  assignRoles(assignRolesInput: $input) {
    code
    data {
      uuid
      fullName
      email
    }
    status
    errorDescription
  }
}
`;