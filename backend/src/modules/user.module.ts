import { HashGenerator } from '@/shared/application/providers/cryptography/hash-generator'
import { Module } from '@nestjs/common'
import { BcryptHasher } from './application/providers/cryptography/bcrypt-hasher.provider'
import { UserFindByIdService } from './application/use-cases/user/find-by-id/user-find-by-id.service'
import { UserSignupUseCase } from './application/use-cases/user/signup/user-signup.usecase'
import { CryptographyModule } from './cryptography.module'
import { DatabaseModule } from './database.module'
import { UserPrismaRepository } from './enterprise/repositories/prima-repository/user-prisma.repository'
import { UserFindByIdController } from './infrastructure/controllers/user/find-by-id/user-find-by-id.constroller'
import { UserSignupController } from './infrastructure/controllers/user/signup/user-signup.controller'
import { UserMeController } from './infrastructure/controllers/user/user-profile/user-me.controller'
import { UserMeService } from './application/use-cases/user/user-me/user-me.service'

@Module({
    imports: [DatabaseModule, CryptographyModule],
    controllers: [
        UserSignupController,
        UserFindByIdController,
        UserMeController,
    ],
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
            provide: UserFindByIdService,
            useFactory: (userPrismaRepository: UserPrismaRepository) => {
                return new UserFindByIdService(userPrismaRepository)
            },
            inject: [UserPrismaRepository],
        },
        {
            provide: UserMeService,
            useFactory: (userPrismaRepository: UserPrismaRepository) => {
                return new UserMeService(userPrismaRepository)
            },
            inject: [UserPrismaRepository],
        },
    ],
})
export class UserModule {}
