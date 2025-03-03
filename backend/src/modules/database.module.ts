import { PrismaService } from '@/shared/enterprise/database/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { UserPrismaRepository } from './enterprise/repositories/prima-repository/user-prisma.repository'

@Module({
    providers: [
        PrismaService,
        {
            provide: 'PrismaService',
            useClass: PrismaService,
        },
        {
            provide: UserPrismaRepository,
            useFactory: (prismaService: PrismaService) => {
                return new UserPrismaRepository(prismaService)
            },
            inject: ['PrismaService'],
        },
    ],
    exports: [
        PrismaService,
        {
            provide: 'PrismaService',
            useClass: PrismaService,
        },
        {
            provide: UserPrismaRepository,
            useFactory: (prismaService: PrismaService) => {
                return new UserPrismaRepository(prismaService)
            },
            inject: ['PrismaService'],
        },
    ],
})
export class DatabaseModule {}
