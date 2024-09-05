import { NextResponse } from "next/server";
import { connectMongodb} from "../../../../lib/mogodb";
import user from "../../../../model/user";
import bcrypt from "bcryptjs";
import { query } from "../../../../lib/MysqlConnect";
export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await query(`INSERT INTO users (name, email, password) VALUES (?,?,?)`,[name, email, hashedPassword]);


        return NextResponse.json({ message : "User created successfully" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }




}

export async function GET(req) {
    try {
        
        await connectMongodb();
        const dataUser  = await user.find();


        return NextResponse.json({dataUser});

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }




}