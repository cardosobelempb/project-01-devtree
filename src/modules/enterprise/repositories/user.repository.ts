import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'
import { UserEntity } from '../entities/user.entity'
import { Slug } from '@/shared/enterprise/entities/value-objects/slug/slug'

export abstract class UserRepository extends RepositoryAbstract<UserEntity> {
    abstract findByEmail(email: string): Promise<UserEntity | null>
    abstract findByUserName(userName: Slug): Promise<UserEntity | null>
    abstract emailExists(email: string): Promise<boolean>
}
