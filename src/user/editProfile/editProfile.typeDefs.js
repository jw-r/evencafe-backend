import { gql } from "apollo-server";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      email: String
      name: String
      username: String
      password: String
      location: String
      avatarURL: Upload
      githubUsername: String
    ): EditProfileResult!
  }
`;
