import { UseCaseError } from '@/shared/application/errors/use-case-error'

export class ResourceNotFoundError extends Error implements UseCaseError {
    constructor() {
        super('Resource not found')
    }
}
