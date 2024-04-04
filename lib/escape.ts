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

export async function escapeQuery(query: string) {
    try {
    await sql.connect(escapeConfig);
        
    const result = await sql.query(query);
    console.log(result)
    await sql.close();
    return result
    } catch (err) {
        console.error('SQL error: ',err)
}
}