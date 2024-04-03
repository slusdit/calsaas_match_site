import sql from 'mssql';

export const escapeConfig = {
    user: process.env.ESCAPE_USER,
    password: process.env.ESCAPE_PASSWORD,
    server: process.env.ESCAPE_SERVER,
    database: process.env.ESCAPE_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}