import { NestFactory } from '@nestjs/core'

import { ConfigService } from '@nestjs/config'
import { EnvType } from './shared/env/env'
import { AppModule } from './modules/app.module'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    const configService = app.get<ConfigService<EnvType, true>>(ConfigService)
    const appPort = configService.get('APP_PORT', { infer: true })
    const prefixUrl = configService.get('PREFIX_URL', { infer: true })

    app.setGlobalPrefix(prefixUrl)
    await app.listen(appPort)
}
bootstrap()
