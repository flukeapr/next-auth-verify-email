"use server";
import { query } from "../../../../lib/MysqlConnect";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export async function MailAction({ email }) {
   try {
        const data = await query(`SELECT * FROM users WHERE email = ?`, [email]);
        if(data.length === 0) {
            return {message: "User not found"}
        }
        if(data) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded)
            var transport = nodemailer.createTransport({
                secure:true,
                host:'smtp.gmail.com',
                port:465,
                auth: {
                  user: process.env.MAIL_USER,
                  pass: process.env.MAIL_PASSWORD
                }
              });
              const htmlBody = `<div>
              <h1>Verify Email</h1>
              <h4>Click the link below to verify your email</h4>
              <a href= "http://localhost:3000/verify-email/${token}">Click here</a>
              </div>`
              const info = await transport.sendMail({
                from: "Admin <admin@example.com>",
                to:  email, 
                subject: "Verify Email",
                text: "Verify Email",
                html: htmlBody, 
              });
              console.log("Message sent: %s", info.messageId);
              return {message: "Email sent"}
        }

   } catch (error) {
        console.log(error)
        return {message: "Error"}
   }
}