import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(scryptCallback);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString('hex')}`;
}

export async function verifyPassword(password: string, storedPassword: string) {
  const [salt, hash] = storedPassword.split(':');

  if (!salt || !hash) {
    return false;
  }

  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  const hashBuffer = Buffer.from(hash, 'hex');

  if (hashBuffer.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(hashBuffer, derivedKey);
}
