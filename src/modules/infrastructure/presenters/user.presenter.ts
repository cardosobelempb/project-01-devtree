import { UserEntity } from '@/modules/enterprise/entities/user.entity'
import { User } from '@prisma/client'

export class UserPresenter {
    static toHTTP(user: UserEntity) {
        return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            userName: user.userName.value,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }
}
