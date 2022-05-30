import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editProfile(
      email: String
      name: String
      username: String
      password: String
      location: String
      avatarURL: Upload
      githubUsername: String
    ): MutationResponse!
  }
`;
