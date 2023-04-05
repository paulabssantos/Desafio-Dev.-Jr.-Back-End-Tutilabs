import * as bcrypt from 'bcrypt';
import { Hash } from '../hash';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptHashService implements Hash {
    async hash(password: string) {
        const saltOrRounds = 10;
        const hash: string = await bcrypt.hash(password, saltOrRounds);
        return hash
    }
}