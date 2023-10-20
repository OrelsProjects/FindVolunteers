import NextAuth from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";

export default NextAuth({
  providers: [
    LinkedInProvider({
      clientId: "77d2xcxzfssa8c",
      clientSecret: "o3wIelkyTUNVbUuI",
    }),
  ],
});
