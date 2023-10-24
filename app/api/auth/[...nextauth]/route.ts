import { volunteersCol } from "@/utils/firestore";
import { getDocs, limit, query, where } from "firebase/firestore";
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
    async signIn(user: any) {
      try {
        // Fetch additional user data from your database based on email
        const res = await getDocs(
          query(volunteersCol, where("email", "==", user.user.email), limit(1))
        );
        let additionalUserData = {};
        if (res.docs.length > 0) {
          additionalUserData = res.docs[0].data();
        }

        // Merge additional data into the user object
        return {
          ...user,
          ...additionalUserData,
        };
      } catch (e) {
        console.log(e);
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
