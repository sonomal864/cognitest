import { NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
export const authOptions: NextAuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID ?? "",
      clientSecret: process.env.COGNITO_CLIENT_SECRET ?? "",
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account) {
        token.id = user.id;
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.accessTokenExpires = account.expires_at;
        token.refreshToken = account.refresh_token;
      }
      if (profile) {
        token.groups = profile.groups;
        token.familyName = profile.family_name;
        token.firstName = profile.first_name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.idToken) {
        session.user.id = token.id;
        session.user.idToken = token.idToken;
        session.user.accessToken = token.accessToken;
        session.user.accessTokenExpires = token.accessTokenExpires;
        session.user.refreshToken = token.refreshToken;
        session.user.groups = token.groups;
        session.user.familyName = token.familyName;
        session.user.firstName = token.firstName;
      }

      return session;
    },
  },
};
