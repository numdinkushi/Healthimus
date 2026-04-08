import { getServerSession, type NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

import { syncUserToConvex } from "@/lib/server/convex-user-sync";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!account?.providerAccountId || !account.provider) {
        return true;
      }

      try {
        await syncUserToConvex({
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          email: user.email,
          name: user.name,
          image: user.image,
        });
      } catch (error) {
        console.warn("[Healthimus] Convex sync skipped:", error);
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/",
  },
};

export const auth = () => getServerSession(authOptions);
