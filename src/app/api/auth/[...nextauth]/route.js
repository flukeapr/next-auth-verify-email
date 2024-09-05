import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongodb } from "../../../../../lib/mogodb";
import user from "../../../../../model/user";
import bcrypt from "bcryptjs";
import { query } from "../../../../../lib/MysqlConnect";
import { NextResponse } from "next/server";

const authProvider ={
    providers: [
        CredentialsProvider({
          name: 'credentials',
          credentials: {},
          async authorize(credentials, req) {
           const { email, password } = credentials;
           try {
            
            const dataUser = await query(`SELECT * FROM users WHERE email = ?`,[email]);
            console.log(dataUser)

            if (!dataUser || dataUser.length === 0) {
              throw new Error('Invalid Email');
            }
            if(dataUser[0].verify === "false"){
              throw new Error('Email not verified');
            }

            const passwordMatch = await bcrypt.compare(password, dataUser[0].password);

            if(!passwordMatch){
               throw new Error('Invalid Password');
            }
            return {
              id: dataUser[0].id,
              name: dataUser[0].name,
              email: dataUser[0].email
            };


           } catch (error) {
            console.log(error)
            throw new Error(error.message);
           }
          }
        })
      ],
      session :{
        strategy: "jwt",
      },
      secret: process.env.NEXTAUTH_SECRET,
      pages:{
        signIn:"/login"
      },
      callbacks: {
        jwt: async ({ token, user }) => {
        
          
          return {...token,...user}
        },
        session: async ({ session, token }) => {
          session.user = token
          return session
        }
      },
}

const handel = NextAuth(authProvider);
export {handel as GET,handel as POST};