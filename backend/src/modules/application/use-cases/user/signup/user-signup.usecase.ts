import { UserEntity } from '@/modules/enterprise/entities/user.entity'
import { UserPrismaRepository } from '@/modules/enterprise/repositories/prima-repository/user-prisma.repository'
import { HashGenerator } from '@/shared/application/providers/cryptography/hash-generator'
import { Slug } from '@/shared/enterprise/entities/value-objects/slug/slug'
import { Either, left, right } from '@/shared/handle-erros/either'
import { UserAlreadyExistsError } from '../../errors/user-already-exists.error'

export namespace UserSignupProps {
    export interface Request {
        name: string
        userName: Slug
        email: string
        password: string
    }

    export type Response = Either<
        UserAlreadyExistsError,
        {
            user: UserEntity
        }
    >
}

export class UserSignupUseCase {
    constructor(
        private readonly bcryptHasher: HashGenerator,
        private readonly userPrismaRepository: UserPrismaRepository,
    ) {}

    async execute({
        name,
        userName,
        email,
        password,
    }: UserSignupProps.Request): Promise<UserSignupProps.Response> {
        const userWithSameEmail =
            await this.userPrismaRepository.findByEmail(email)

        if (userWithSameEmail) {
            return left(new UserAlreadyExistsError(email))
        }

        const userWithSameUserName =
            await this.userPrismaRepository.findByUserName(userName)

        if (userWithSameUserName) {
            return left(new UserAlreadyExistsError(userName.value))
        }

        const hashedPassword = await this.bcryptHasher.hash(password)
        const formatUserName = Slug.createFromUserName(userName.value)

        const user = UserEntity.create({
            name,
            userName: formatUserName,
            email,
            password: hashedPassword,
        })

        await this.userPrismaRepository.create(user)

        return right({
            user,
        })
    }
}
