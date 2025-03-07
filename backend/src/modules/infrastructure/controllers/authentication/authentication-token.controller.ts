import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UnauthorizedException,
    UsePipes,
} from '@nestjs/common'

import { AuthenticationTokenUseCase } from '@/modules/application/use-cases/authentication/authentication-token.usecase'
import { WrongCredentialsError } from '@/modules/application/use-cases/errors/wrong-credentials.error'
import { Public } from '@/shared/infrastructure/guards/jwt/public'
import { ZodValidationPipe } from '@/shared/infrastructure/pipes/zod-validation.pipe'
import { z } from 'zod'

export namespace AuthenticationTokenProps {
    export const request = z.object({
        email: z.string().email().min(1, 'Campo obrigatório.'),
        password: z.string().min(1, 'Campo obrigatório.'),
    })

    export type Request = z.infer<typeof request>

    export type Response = {
        accessToken: string
    }
}

@Controller('/auth/token')
@Public()
export class AuthenticationTokenController {
    constructor(
        private readonly authenticationTokenUseCase: AuthenticationTokenUseCase,
    ) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ZodValidationPipe(AuthenticationTokenProps.request))
    async handle(@Body() body: AuthenticationTokenProps.Request) {
        const { email, password } = body

        const result = await this.authenticationTokenUseCase.execute({
            email,
            password,
        })

        if (result.isLeft()) {
            const error = result.value

            switch (error.constructor) {
                case WrongCredentialsError:
                    throw new UnauthorizedException(error.message)
                default:
                    throw new BadRequestException(error.message)
            }
        }

        const { accessToken } = result.value

        return {
            access_token: accessToken,
        }
    }
}
