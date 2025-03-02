import { HashComparer } from '@/shared/application/providers/cryptography/hash-comparer'
import { HashGenerator } from '@/shared/application/providers/cryptography/hash-generator'
import { compare, hash, genSalt } from 'bcryptjs'

export class BcryptHasher implements HashGenerator, HashComparer {
    private HASH_SALT_LENGTH = 8

    async hash(plain: string): Promise<string> {
        const salt = await genSalt(this.HASH_SALT_LENGTH)
        return hash(plain, salt)
    }

    compare(plain: string, hash: string): Promise<boolean> {
        return compare(plain, hash)
    }
}
