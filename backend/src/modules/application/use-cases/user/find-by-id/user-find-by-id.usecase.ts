import { UserEntity } from '@/modules/enterprise/entities/user.entity'
import { UserPrismaRepository } from '@/modules/enterprise/repositories/prima-repository/user-prisma.repository'
import { Either, left, right } from '@/shared/handle-erros/either'
import { ResourceNotFoundError } from '../../errors/resource-not-found.erro'

export namespace UserFindByIdProps {
    export interface Request {
        userId: string
    }

    export type Response = Either<ResourceNotFoundError, { user: UserEntity }>
}

export class UserFindByIdUseCase {
    constructor(private userPrismaRepository: UserPrismaRepository) {}

    async execute({
        userId,
    }: UserFindByIdProps.Request): Promise<UserFindByIdProps.Response> {
        const user = await this.userPrismaRepository.findById(userId)

        if (!user) {
            return left(new ResourceNotFoundError())
        }

        return right({
            user,
        })
    }
}
