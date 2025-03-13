import {
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

export class AuthTokenGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = await context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)

        if (!token) {
            throw new UnauthorizedException(`Não logado!`)
        }

        try {
            // const payload = await this.jwtService.
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException(`Falha ao logar!`)
        }
        return true
    }

    extractTokenFromHeader(request: Request): string | undefined {
        const authorization = request.headers?.authorization

        if (!authorization || typeof authorization !== 'string') {
            return
        }

        return authorization.split(' ')[1]
    }
}
