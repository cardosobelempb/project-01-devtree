import { envSchema } from '@/shared/env/env'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user.module'
import { AuthenticationModule } from './authentication.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: env => envSchema.parse(env),
            isGlobal: true,
        }),
        AuthenticationModule,
        UserModule,
    ],
    providers: [],
})
export class AppModule {}
