namespace NodeJS {
    interface ProcessEnv {
        GOOGLE_OAUTH_CLIENT_ID: string;
        GOOGLE_OAUTH_CLIENT_SECRET: string;
        POSTGRES_DB_ADDRESS: string;
        DATABASE_URL: string;

        NEXTAUTH_SECRET: string;
        NEXTAUTH_URL: string;
        JWT_SIGNING_PRIVATE_KEY: string;
        JWT_ENCRYPTION_KEY: string;

        ESCAPE_USER: string;
        ESCAPE_PASSWORD: string;
        ESCAPE_SERVER: string;
        ESCAPE_DATABASE: string;
    }
}