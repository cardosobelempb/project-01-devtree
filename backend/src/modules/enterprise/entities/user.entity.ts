import { Entity } from '@/shared/enterprise/entities/entity'
import { Slug } from '@/shared/enterprise/entities/value-objects/slug/slug'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Optional } from '@prisma/client/runtime/library'

export interface UserEntityProps {
    name: string
    userName: Slug
    email: string
    password: string
    isActive: boolean | null
    createdAt: Date
    updatedAt?: Date | null
}

export class UserEntity extends Entity<UserEntityProps> {
    get name() {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
    }

    get userName() {
        return this.props.userName
    }

    set userName(userName: Slug) {
        this.props.userName = userName
    }

    // get transformUserName() {
    //     // return this.content.substring(0, 120).trimEnd().concat('...')
    //     return this.props.userName
    //         .trim()
    //         .split(' ')
    //         .join('')
    //         .toLocaleLowerCase()
    //         .padStart(this.props.userName.length, '@')
    // }

    get email() {
        return this.props.email
    }

    set email(email: string) {
        this.props.email = email
    }

    get password() {
        return this.props.password
    }

    set password(password: string) {
        this.props.password = password
    }

    get isActive() {
        return this.props.isActive
    }

    set isActive(isActive: boolean | null) {
        this.props.isActive = isActive
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    static create(
        props: Optional<
            UserEntityProps,
            'createdAt' | 'updatedAt' | 'isActive'
        >,
        id?: UniqueEntityUUID,
    ) {
        const user = new UserEntity(
            {
                ...props,
                isActive: props.isActive ?? true,
                createdAt: props.createdAt ?? new Date(),
                updatedAt: props.updatedAt ?? props.createdAt,
            },
            id,
        )

        return user
    }
}
