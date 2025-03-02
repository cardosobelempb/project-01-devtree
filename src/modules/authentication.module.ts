import { Encrypter } from '@/shared/application/providers/cryptography/encrypter'
import { HashComparer } from '@/shared/application/providers/cryptography/hash-comparer'
import { EnvType } from '@/shared/env/env'
import { JwtStrategy } from '@/shared/infrastructure/guards/jwt/jwt.strategy'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthenticationTokenUseCase } from './application/use-cases/authentication/authentication-token.usecase'
import { CryptographyModule } from './cryptography.module'
import { DatabaseModule } from './database.module'
import { UserPrismaRepository } from './enterprise/repositories/prima-repository/user-prisma.repository'
import { AuthenticationTokenController } from './infrastructure/controllers/authentication/authentication-token.controller'
import { JwtAuthGuard } from '@/shared/infrastructure/guards/jwt/JwtAuth.guard'
import { APP_GUARD } from '@nestjs/core'

@Module({
    imports: [
        DatabaseModule,
        PassportModule,
        CryptographyModule,
        JwtModule.registerAsync({
            global: true,
            inject: [ConfigService],
            useFactory(config: ConfigService<EnvType, true>) {
                const jwtPrivateKey = config.get('JWT_PRIVATE_KEY', {
                    infer: true,
                })
                const jwtPublicKey = config.get('JWT_PUBLIC_KEY', {
                    infer: true,
                })
                const jwtExpiresIn = config.get('JWT_EXPIRES_IN', {
                    infer: true,
                })
                return {
                    signOptions: {
                        algorithm: 'RS256',
                        expiresIn: jwtExpiresIn,
                    },
                    privateKey: Buffer.from(jwtPrivateKey, 'base64'),
                    publicKey: Buffer.from(jwtPublicKey, 'base64'),
                }
            },
        }),
    ],
    controllers: [AuthenticationTokenController],
    providers: [
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: AuthenticationTokenUseCase,
            useFactory: (
                hashComparer: HashComparer,
                encrypter: Encrypter,
                userPrismaRepository: UserPrismaRepository,
            ) => {
                return new AuthenticationTokenUseCase(
                    hashComparer,
                    encrypter,
                    userPrismaRepository,
                )
            },
            inject: [HashComparer, Encrypter, UserPrismaRepository],
        },
    ],
    exports: [],
})
export class AuthenticationModule {}
