import { gql } from "@apollo/client";


export const GET_ALL_ROLES = gql`
  query getRoles {
    getRoles {
      uuid
      name
      displayName
      description
    }
  }
`

export const CREATE_ROLE = gql`
mutation createRole($input: RoleInput!) {
  createRole(input: $input) {
    code
    data {
      uuid
      name
      displayName
      description
    }
    status
    errorDescription
  }
}
`;

export const DELETE_ROLE = gql`
mutation deleteRole($uuid: String!) {
  deleteRole(uuid: $uuid) {
    code
    data {
      uuid
      name
      displayName
      description
    }
    status
    errorDescription
  }
}
`;

export const UPDATE_ROLE = gql`
mutation updateRole($uuid: String!, $input: RoleInput!) {
  updateRole(uuid: $uuid, updateRoleInput: $input) {
    code
    data {
      uuid
      name
      displayName
      description
    }
    status
    errorDescription
  }
}
`;

export const GET_ROLE = gql`
query getRole($uuid: String!) {
  getRole(uuid: $uuid) {
    uuid
    name
    displayName
    description
    permissions {
      uuid
      name
      description
      permissionGroupName
    }
  }
  getAllPermissionsGroupedByPermissionGroupName(roleUuid: $uuid) {
    permissionGroupName
    permissions {
      uuid
      name
      displayName
      belongToThisRole
    }
  }
}
`;

export const ASSIGN_PERMISSIONS = gql`
mutation assignPermissions($input: AssignPermissionsInput!) {
  assignPermissions(input: $input) {
    code
    data {
      uuid
      name
      displayName
      description
    }
    status
    errorDescription
  }
}
`;