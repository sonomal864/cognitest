import { JWT as NextAuthJWT } from "next-auth/jwt";
import {
  DefaultSession,
  DefaultUser,
  Profile as DefaultProfile,
} from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: string;
    user: {
      id?: string;
      idToken?: string;
      accessToken?: string;
      accessTokenExpires?: number;
      refreshToken?: string;
      groups?: string[];
      familyName?: string;
      firstName?: string;
    } & DefaultSession["user"];
  }

  interface Profile extends DefaultProfile {
    "cognito:groups"?: string[];
    family_name?: string;
    first_name?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    id?: string;
    idToken?: string;
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
    groups?: string[];
    familyName?: string;
    firstName?: string;
  }
}
