import { NestFactory } from '@nestjs/core'

import { ConfigService } from '@nestjs/config'
import { EnvType } from './shared/env/env'
import { AppModule } from './modules/app.module'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    const configService = app.get<ConfigService<EnvType, true>>(ConfigService)
    const appPort = configService.get('APP_PORT', { infer: true })
    const prefixUrl = configService.get('PREFIX_URL', { infer: true })
    const frontendUrl = configService.get('FRONTEND_URL', { infer: true })

    app.enableCors({
        origin: `${frontendUrl}`,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
    app.setGlobalPrefix(prefixUrl)
    await app.listen(appPort)
}
bootstrap()
