import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto'

/**
 * Hashes a plain text password using Node's native scrypt algorithm.
 */
export function hashPasswordScrypt(password: string): string {
    const salt = randomBytes(16).toString('hex')
    const hash = scryptSync(password, salt, 64).toString('hex')
    return `${salt}:${hash}`
}

/**
 * Verifies a plain text password against a stored native scrypt hash.
 */
export function verifyPasswordScrypt(password: string, storedHash: string): boolean {
    const parts = storedHash.split(':')
    if (parts.length !== 2) {
        return false
    }
    const [salt, hash] = parts
    const inputHash = scryptSync(password, salt, 64).toString('hex')
    return timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(inputHash, 'hex'))
}
