import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';

@Injectable()
export class TemporarilyBlockedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    throw new ServiceUnavailableException(
      `Endpoint ${request.method} ${request.url} is temporarily blocked`,
    );
  }
}
