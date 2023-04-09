import { Module } from '@nestjs/common';
import { Hash } from './hash';
import { BcryptHashService } from './implementations/BcryptHash.service';

@Module({
    providers: [{ provide: Hash, useClass: BcryptHashService }],
    exports: [Hash]
})
export class HashModule { }
