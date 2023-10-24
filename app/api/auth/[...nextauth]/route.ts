import NextAuth from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: { scope: "openid profile email" },
      },
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      async profile(profile, tokens) {
        return { ...profile, id: profile.sub, image: profile.picture };
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true
    // },
    async session({ session, token } : { session: any, token: any}) {
      // Send properties to the client, like an access_token from a provider.
      if (session && session.user) {
        const extraUserInfo = { _id: 1}; //await fetchUser(session.user.email);
        if (token) {
          session.accessToken = token.accessToken;
        }
        session.user = { ...session.user, ...extraUserInfo };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
