import { UserPrismaRepository } from '@/modules/enterprise/repositories/prima-repository/user-prisma.repository'
import { Encrypter } from '@/shared/application/providers/cryptography/encrypter'
import { HashComparer } from '@/shared/application/providers/cryptography/hash-comparer'
import { Either, left, right } from '@/shared/handle-erros/either'
import { WrongCredentialsError } from '../errors/wrong-credentials.error'

export namespace AuthenticationTokenProps {
    export interface Request {
        email: string
        password: string
    }

    export type Response = Either<
        WrongCredentialsError,
        {
            accessToken: string
        }
    >
}

export class AuthenticationTokenUseCase {
    constructor(
        private readonly hashComparer: HashComparer,
        private readonly encrypter: Encrypter,
        private readonly userPrismaRepository: UserPrismaRepository,
    ) {}

    async execute({
        email,
        password,
    }: AuthenticationTokenProps.Request): Promise<AuthenticationTokenProps.Response> {
        const user = await this.userPrismaRepository.findByEmail(email)

        if (!user) {
            return left(new WrongCredentialsError())
        }
        const isPasswordValid = await this.hashComparer.compare(
            password,
            user.password,
        )
        if (!isPasswordValid) {
            return left(new WrongCredentialsError())
        }

        const accessToken = await this.encrypter.encrypt({
            sub: user.id.toString(),
        })

        return right({
            accessToken,
        })
    }
}
