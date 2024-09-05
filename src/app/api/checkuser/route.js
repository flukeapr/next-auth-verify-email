import { NextResponse } from "next/server";
import { connectMongodb} from "../../../../lib/mogodb";
import user from "../../../../model/user";
import { query } from "../../../../lib/MysqlConnect";

export async function POST(req) {
    try {
       const {email} = await req.json();
       const dataUser  = await query(`SELECT * FROM users WHERE email = ?`,[email]);

       return NextResponse.json({data:dataUser});
        

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }




}