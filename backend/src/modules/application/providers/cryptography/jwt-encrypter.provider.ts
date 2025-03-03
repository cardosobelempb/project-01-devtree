import { Encrypter } from '@/shared/application/providers/cryptography/encrypter'
import { JwtService } from '@nestjs/jwt'

export class JwtEncrypter implements Encrypter {
    constructor(private readonly jwtService: JwtService) {}

    encrypt(payload: Record<string, unknown>): Promise<string> {
        return this.jwtService.signAsync(payload)
    }
}
