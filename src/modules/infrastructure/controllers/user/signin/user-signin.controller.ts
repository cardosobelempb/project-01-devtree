import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UsePipes,
} from '@nestjs/common'

import { UserSigninUseCase } from '@/modules/application/use-cases/user/signin/user-signin.usecase'
import { ZodValidationPipe } from '@/shared/infrastructure/pipes/zod-validation.pipe'
import { z } from 'zod'

export namespace UserSigninProps {
    export const request = z.object({
        email: z.string().email().min(1, 'Campo obrigatório.'),
        password: z.string().min(1, 'Campo obrigatório.'),
    })

    export type Request = z.infer<typeof request>
}

@Controller('/signin')
export class UserSigninController {
    constructor(private readonly userSigninUseCase: UserSigninUseCase) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ZodValidationPipe(UserSigninProps.request))
    async handle(@Body() body: UserSigninProps.Request) {
        const { email, password } = body

        await this.userSigninUseCase.execute({
            email,
            password,
        })
    }
}
