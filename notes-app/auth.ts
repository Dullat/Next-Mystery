import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // We force the JWT strategy because we are using Email/Password login
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 1. Ensure the user actually submitted an email and password
        if (!credentials?.email || !credentials?.password) return null;

        // 2. Look up the user in Postgres
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

        // 3. If no user exists, or they don't have a password, reject login
        if (!user || !user.password) return null;

        // 4. Mathematically compare the typed password against the hashed password
        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        // 5. If it's a match, return the user object. Auth.js takes this object, 
        // mints a JWT, and sets it as an HTTP-only cookie.
        if (passwordsMatch) return user;

        return null;
      }
    })
  ],
});
