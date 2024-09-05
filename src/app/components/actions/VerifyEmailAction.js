'use server';
import { query } from "../../../../lib/MysqlConnect";
import jwt from "jsonwebtoken";

export async function VerifyEmailAction({ token }) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;
        await query(`UPDATE users SET verify = "true" WHERE email = ?`, [email]);
        return { message: "Email verified successfully" };
    } catch (error) {
        console.log(error);
        return { error: "Invalid token" };
    }
}