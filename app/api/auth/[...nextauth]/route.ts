import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "@/lib/mockData";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<string, unknown> | undefined
      ): Promise<any | null> {
        if (!credentials) return null;

        const { email, password } = credentials as {
          email?: string;
          password?: string;
        };

        if (!email || !password) return null;

        const user = users.find(
          (u) => u.email === email && u.password === password
        );
        if (!user) return null;
        return { id: String(user.id), name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as any).user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if ((token as any).user) {
        session.user = (token as any).user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET ?? "dev-secret",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
