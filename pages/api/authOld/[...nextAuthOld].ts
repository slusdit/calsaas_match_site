import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import validator from "validator";
import bcrypt from "bcrypt";
import makeJwt from "../../../utils/makeJWT";
import { setCookie } from "cookies-next"

const prisma = new PrismaClient()


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if(req.method === "POST"){
        const errors: string[]= []
        const {email, password} = req.body

        const validationSchema = [
            {
                valid: validator.isEmail(email),
                errorMessage: "Email is invalid"
            },
            {
                valid: validator.isLength(password,{
                    min: 1
                }),
                errorMessage: "Password is blank",
            }
        ]

        validationSchema.forEach(check => {
            if(!check.valid){
                errors.push(check.errorMessage)
            }
        })

        if (errors.length) {
            return res.status(400).json({
                errorMessage: errors[0]
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (!user){
            return res.status(401).json({errorMessage: "User not found. Your email or password are incorrect"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch){
            return res.status(401).json({errorMessage: "User not found. Your email or password are incorrect"})
        }

        const alg = "HS256"

        const secret = new TextEncoder().encode(process.env.JWT_SECRET)

        

        const token = await new jose.SignJWT({
                email: user.email,
                // firstName: userWithEmail.firstName,
                // lastName: userWithEmail.lastName,
                // city: userWithEmail.city,
                // phone: userWithEmail.phone
            })
            .setProtectedHeader({alg})
            .setExpirationTime("24h")
            .sign(secret)

            setCookie(
                "jwt", 
                token,
                {
                    req,
                     res,
                     maxAge: 60*60*24*6
                }
            )
            
            return res.status(200).json({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                city: user.city
            })

    }

    return res.status(404).json("Undefined endpoint")
}