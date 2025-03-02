import { PrismaService } from '@/shared/enterprise/database/prisma/prisma.service'
import { Slug } from '@/shared/enterprise/entities/value-objects/slug/slug'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { UserEntity } from '../../entities/user.entity'
import { UserPrismaMapper } from '../../mappers/user-prisma.mapper'
import { UserRepository } from '../user.repository'

export class UserPrismaRepository implements UserRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findById(id: string): Promise<UserEntity | null> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            },
        })

        if (!user) {
            return null
        }

        return UserPrismaMapper.toDomain(user)
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        })

        if (!user) {
            return null
        }

        return UserPrismaMapper.toDomain(user)
    }

    async findByUserName(name: Slug): Promise<UserEntity | null> {
        const user = await this.prismaService.user.findUnique({
            where: {
                userName: name.value,
            },
        })

        if (!user) {
            return null
        }

        return UserPrismaMapper.toDomain(user)
    }

    async emailExists(email: string): Promise<boolean> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        })
        console.log(user)

        if (user) {
            return true
        }

        return false
    }

    async findMany({ page }: Pagination.Params): Promise<UserEntity[]> {
        const users = await this.prismaService.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 20,
            skip: (page - 1) * 20,
        })

        return users.map(user => UserPrismaMapper.toDomain(user))
    }

    async create(entity: UserEntity): Promise<void> {
        const data = UserPrismaMapper.toPrisma(entity)
        await this.prismaService.user.create({
            data,
        })
    }

    async update(entity: UserEntity): Promise<void> {
        const data = UserPrismaMapper.toPrisma(entity)

        await Promise.all([
            this.prismaService.user.update({
                where: {
                    id: entity.id.toString(),
                },
                data,
            }),
        ])
    }

    async delete(entity: UserEntity): Promise<void> {
        await this.prismaService.user.delete({
            where: {
                id: entity.id.toString(),
            },
        })
    }
}
