import { Module } from '@nestjs/common'

import { Encrypter } from '@/shared/application/providers/cryptography/encrypter'
import { HashComparer } from '@/shared/application/providers/cryptography/hash-comparer'
import { HashGenerator } from '@/shared/application/providers/cryptography/hash-generator'
import { JwtService } from '@nestjs/jwt'
import { BcryptHasher } from './application/providers/cryptography/bcrypt-hasher.provider'
import { JwtEncrypter } from './application/providers/cryptography/jwt-encrypter.provider'

@Module({
    providers: [
        {
            provide: Encrypter,
            useFactory: (jwtService: JwtService) => {
                return new JwtEncrypter(jwtService)
            },
            inject: [JwtService],
        },
        { provide: HashComparer, useClass: BcryptHasher },
        { provide: HashGenerator, useClass: BcryptHasher },
    ],
    exports: [
        {
            provide: Encrypter,
            useFactory: (jwtService: JwtService) => {
                return new JwtEncrypter(jwtService)
            },
            inject: [JwtService],
        },
        HashComparer,
        HashGenerator,
    ],
})
export class CryptographyModule {}
