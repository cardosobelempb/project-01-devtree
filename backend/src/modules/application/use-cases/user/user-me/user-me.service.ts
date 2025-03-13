import { UserEntity } from '@/modules/enterprise/entities/user.entity'
import { UserPrismaRepository } from '@/modules/enterprise/repositories/prima-repository/user-prisma.repository'
import { Either, left, right } from '@/shared/handle-erros/either'
import { ResourceNotFoundError } from '../../errors/resource-not-found.erro'

export namespace UserInforProps {
    export interface Request {
        userId: string
    }

    export type Response = Either<ResourceNotFoundError, { user: UserEntity }>
}

export class UserMeService {
    constructor(private userPrismaRepository: UserPrismaRepository) {}

    async execute({
        userId,
    }: UserInforProps.Request): Promise<UserInforProps.Response> {
        const user = await this.userPrismaRepository.findById(userId)
        // console.log('UserProfileUserCase =>', user)

        if (!user) {
            return left(new ResourceNotFoundError())
        }

        return right({
            user,
        })
    }
}
