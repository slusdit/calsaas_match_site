import GoogleProvider from 'next-auth/providers/google';
import NextAuth, { AuthOptions } from "next-auth";


export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
        })
    ]
}


const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}