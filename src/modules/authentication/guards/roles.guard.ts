import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { roles } from '../enum/roles.enum';
import { HttpException, HttpStatus } from "@nestjs/common"

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<roles[]>(
            'roles',
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (requiredRoles.some((role) => role === user.fk_roles)) {
            return true
        } else {
            throw new HttpException('Você não tem permissão para acessar esta parte do sistema', HttpStatus.UNAUTHORIZED)
        }
    }
}