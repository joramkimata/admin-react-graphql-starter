import { gql } from "@apollo/client";


export const GET_USER_PERMISSIONS = gql`
query {
  getUserPermissions 
}
`;