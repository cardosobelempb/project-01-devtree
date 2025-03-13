import { UserMeService } from '@/modules/application/use-cases/user/user-me/user-me.service'
import { UserEntity } from '@/modules/enterprise/entities/user.entity'
import { UserPresenter } from '@/modules/infrastructure/presenters/user.presenter'
import { JwtPayloadInfer } from '@/shared/infrastructure/guards/jwt/jwt.strategy'
import { UserInLoggaed } from '@/shared/infrastructure/guards/jwt/user-in-logged.decorator'
import { ZodValidationPipe } from '@/shared/infrastructure/pipes/zod-validation.pipe'
import {
    BadRequestException,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
} from '@nestjs/common'
import { z } from 'zod'

export namespace UserMeProps {
    const schema = z.object({
        userId: z.string().uuid('Error 404 Not Found id doesn’t exist'),
    })

    export const request = new ZodValidationPipe(schema)

    export type Request = z.infer<typeof schema>

    export interface Response {
        user: UserEntity
    }
}

@Controller('me')
export class UserMeController {
    constructor(private readonly userMeService: UserMeService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    async handle(@UserInLoggaed() user: JwtPayloadInfer) {
        const userId = user.sub
        // console.log(user)
        const result = await this.userMeService.execute({
            userId,
        })
        // console.log('Result =>', result.value)

        if (result.isLeft()) {
            throw new BadRequestException()
        }

        return {
            user: UserPresenter.toHTTP(result.value.user),
        }
    }
}
