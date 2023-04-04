import * as bcrypt from 'bcrypt';

export class HashService {
    async execute(password: string) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash
    }
}