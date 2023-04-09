import { SetMetadata } from '@nestjs/common';
import { roles } from '../enum/roles.enum';

export const Roles = (...args: roles[]) => SetMetadata('roles', args);