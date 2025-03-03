import { UserPrismaRepository } from '@/modules/enterprise/repositories/prima-repository/user-prisma.repository'
import { HashComparer } from '@/shared/application/providers/cryptography/hash-comparer'
import { UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export namespace UserSigninProps {
    export interface Request {
        email: string
        password: string
    }
}

export class UserSigninUseCase {
    constructor(
        private readonly hashComparer: HashComparer,
        private readonly jwtService: JwtService,
        private readonly userPrismaRepository: UserPrismaRepository,
    ) {}

    async execute({ email, password }: UserSigninProps.Request) {
        const user = await this.userPrismaRepository.findByEmail(email)

        if (!user) {
            throw new UnauthorizedException('User credentials do not match.')
        }
        const isPasswordValid = await this.hashComparer.compare(
            password,
            user.password,
        )
        if (!isPasswordValid) {
            throw new UnauthorizedException('User credentials do not match.')
        }
        const accessToken = this.jwtService.signAsync({
            sub: user.id,
        })
        return { access_token: accessToken }
    }
}
