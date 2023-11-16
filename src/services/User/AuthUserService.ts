import prismaClient from '../../prisma'
import { compare, hash } from "bcryptjs"
import { sign } from 'jsonwebtoken'
import authConfig from "./../../utils/auth"

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("Email e Senha não correspondem ou não existe.")
        }

        const passwordMatch = await compare(password, user.password)

        const token = sign({
            email: user.email
        }, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: '365d'
        })

        if (!passwordMatch) {
            throw new Error("Email e Senha não correspondem ou não existe.")
        }

        return ({
            user: {
                id: user.id,
                email: user.email,
            },
            token
        })
    }
}

export { AuthUserService }