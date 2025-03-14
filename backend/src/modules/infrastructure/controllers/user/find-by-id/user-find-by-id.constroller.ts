import { ResourceNotFoundError } from '@/modules/application/use-cases/errors/resource-not-found.erro'
import { UserFindByIdService } from '@/modules/application/use-cases/user/find-by-id/user-find-by-id.service'
import { UserEntity } from '@/modules/enterprise/entities/user.entity'
import { UserPresenter } from '@/modules/infrastructure/presenters/user.presenter'
import { right } from '@/shared/handle-erros/either'
import { UserInLoggaed } from '@/shared/infrastructure/guards/jwt/user-in-logged.decorator'
import { ZodValidationPipe } from '@/shared/infrastructure/pipes/zod-validation.pipe'
import {
    BadRequestException,
    ConflictException,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
} from '@nestjs/common'
import { z } from 'zod'

export namespace UserFindByIdProps {
    const schema = z.object({
        userId: z.string().uuid('Error 404 Not Found id doesn’t exist'),
    })

    export const request = new ZodValidationPipe(schema)

    export type Request = z.infer<typeof schema>

    export interface Response {
        user: UserEntity
    }
}

@Controller('users/:userId')
export class UserFindByIdController {
    constructor(private readonly userFindByIdService: UserFindByIdService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    async handle(
        @Param(UserFindByIdProps.request)
        { userId }: UserFindByIdProps.Request,
    ) {
        const result = await this.userFindByIdService.execute({
            userId,
        })

        if (result.isLeft()) {
            throw new BadRequestException()
        }

        return {
            user: UserPresenter.toHTTP(result.value.user),
        }
    }
}
