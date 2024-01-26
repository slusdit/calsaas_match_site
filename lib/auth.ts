import NextAuth, { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google"; 
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const autoOptions: NextAuthOptions = {
    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID ,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            
          }),
    ],
};

export const getUser = () => {
    return getServerSession(autoOptions)
}

const handler = NextAuth(autoOptions)

export { handler as GET, handler as POST}