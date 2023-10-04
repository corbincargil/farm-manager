import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import clientPromise from "../../../../lib/clientPromise";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import User from "../../../../models/User";
import { connectToDatabase } from "../../../../lib/mongodb";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch("http://localhost:3000/api/v1/users", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const userResponse = await res.json();
        if (!userResponse) return null;

        const passwordsMatch = await bcrypt.compare(credentials.password, userResponse.user.hash);
        if (!passwordsMatch) return null;

        return userResponse.user;
      },
    }),
  ],
  //todo: fix the session object to use jwt (uses jwt by default so prolly not needed)
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
