import { escapeConfig, escapeQuery } from '../../../../lib/escape'
import { NextResponse } from "next/server"


export async function GET({ request }) {
    const sql = require("mssql");
    let conn
    try {
        conn = await sql.connect(escapeConfig);

        const result = await conn.query("SELECT * FROM [EscapeOnline_SLUSD].[dbo].[HRSchool]");
        console.log(result);
        await conn.close();
        return NextResponse.json({
            schools: result
            })
    } catch (err) {
        console.error("SQL error: ", err);
    }
    const data = await escapeQuery("SELECT * FROM [EscapeOnline_SLUSD].[dbo].[HRSchool]")
    console.log(data)
    return NextResponse.json({
        schools: data
        })

}