import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const prisma = new PrismaClient()


export default NextAuth({
  adapter: PrismaAdapter(prisma), 
  providers: [
     GoogleProvider({
       clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
       clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
       profile(profile) {
        console.log(profile)
         return { 
          id: profile.sub, 
          role: profile.role ?? ["USER"],
          name: profile.name,
          email: profile.email,
          image: profile.picture, }
       },
     }),
  ],
  database: process.env.DATABASE_URL,
  callbacks: {
    session({ session, user }) {
      session.user.email = user.email
      session.user.name = user.name
      session.user.image = user.image
      session.user.role = user.role
      return session
    }

},
})