import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const prisma = new PrismaClient()


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      // profile(profile) {
      //   return { id: profile.sub,  role: profile.role ?? "user", }
      // },
    }),
  ],
  adapter: PrismaAdapter(prisma), 
  // database: process.env.DATABASE_URL,
//   callbacks: {
//   async jwt(token, user) {
//     // if (user) {
//     //   token.role = user.role;
//     // }
//     return token;
//  },
//  async session(session, userOrToken) {
//     session.user = userOrToken.role;
//     return session;
//  },
// },
})