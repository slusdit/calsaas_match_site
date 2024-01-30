import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"; 
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const authConfig: NextAuthOptions = {
    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
            
          }),
    ],
};

export const getUser = () => {
    return getServerSession(authConfig)
}

export const config = {
    providers: [], // rest of your config
  } satisfies NextAuthOptions
  
  // Use it in server contexts
  export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSession(...args, config)
  }