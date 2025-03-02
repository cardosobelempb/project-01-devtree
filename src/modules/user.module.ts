import { HashGenerator } from '@/shared/application/providers/cryptography/hash-generator'
import { Module } from '@nestjs/common'
import { BcryptHasher } from './application/providers/cryptography/bcrypt-hasher.provider'
import { UserFindByIdUseCase } from './application/use-cases/user/find-by-id/user-find-by-id.usecase'
import { UserSignupUseCase } from './application/use-cases/user/signup/user-signup.usecase'
import { CryptographyModule } from './cryptography.module'
import { DatabaseModule } from './database.module'
import { UserPrismaRepository } from './enterprise/repositories/prima-repository/user-prisma.repository'
import { UserFindByIdController } from './infrastructure/controllers/user/find-by-id/user-find-by-id.constroller'
import { UserSignupController } from './infrastructure/controllers/user/signup/user-signup.controller'

@Module({
    imports: [DatabaseModule, CryptographyModule],
    controllers: [UserSignupController, UserFindByIdController],
    providers: [
        {
            provide: UserSignupUseCase,
            useFactory: (
                bcryptHasher: BcryptHasher,
                userPrismaRepository: UserPrismaRepository,
            ) => {
                return new UserSignupUseCase(bcryptHasher, userPrismaRepository)
            },
            inject: [HashGenerator, UserPrismaRepository],
        },
        {
            provide: UserFindByIdUseCase,
            useFactory: (userPrismaRepository: UserPrismaRepository) => {
                return new UserFindByIdUseCase(userPrismaRepository)
            },
            inject: [UserPrismaRepository],
        },
    ],
})
export class UserModule {}
