import { Prisma, User as UserPrisma } from '@prisma/client'
import { UserEntity } from '../entities/user.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Slug } from '@/shared/enterprise/entities/value-objects/slug/slug'

export class UserPrismaMapper {
    static toDomain(raw: UserPrisma): UserEntity {
        return UserEntity.create(
            {
                name: raw.name,
                userName: Slug.createFromText(raw.userName),
                email: raw.email,
                password: raw.password,
                isActive: raw.isActive,
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt,
            },
            new UniqueEntityUUID(raw.id),
        )
    }

    static toPrisma(entity: UserEntity): Prisma.UserUncheckedCreateInput {
        return {
            id: entity.id.toString(),
            name: entity.name,
            userName: entity.userName.value,
            email: entity.email,
            password: entity.password,
        }
    }
}
