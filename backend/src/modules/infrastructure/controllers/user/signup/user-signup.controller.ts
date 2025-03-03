import {
    BadRequestException,
    Body,
    ConflictException,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UsePipes,
} from '@nestjs/common'

import { UserSignupUseCase } from '@/modules/application/use-cases/user/signup/user-signup.usecase'
import { UserAlreadyExistsError } from '@/shared/infrastructure/controller-erros/user-already-exists.error'
import { ZodValidationPipe } from '@/shared/infrastructure/pipes/zod-validation.pipe'
import { z } from 'zod'
import { Slug } from '@/shared/enterprise/entities/value-objects/slug/slug'
import { Public } from '@/shared/infrastructure/guards/jwt/public'

export namespace UserSignUpProps {
    export const request = z.object({
        name: z.string().min(1, 'Campo obrigatório.'),
        userName: z.string().trim().toLowerCase().min(1, 'Campo obrigatório.'),
        email: z.string().email().min(1, 'Campo obrigatório.'),
        password: z.string().min(1, 'Campo obrigatório.'),
    })

    export type Request = z.infer<typeof request>
}

@Controller('/signup')
@Public()
export class UserSignupController {
    constructor(private readonly userSignupUseCase: UserSignupUseCase) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ZodValidationPipe(UserSignUpProps.request))
    async handle(@Body() body: UserSignUpProps.Request) {
        const { name, userName, email, password } = body

        const result = await this.userSignupUseCase.execute({
            name,
            userName: Slug.createFromUserName(userName),
            email,
            password,
        })

        if (result.isLeft()) {
            const error = result.value

            switch (error.constructor) {
                case UserAlreadyExistsError:
                    throw new ConflictException(error.message)
                default:
                    throw new BadRequestException(error.message)
            }
        }
    }
}
