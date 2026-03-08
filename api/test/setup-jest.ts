jest.mock('jose', () => ({
  createRemoteJWKSet: jest.fn().mockImplementation(() => ({})),
  jwtVerify: jest.fn().mockResolvedValue({
    payload: { sub: 'test-user-id', email: 'test@example.com' },
  }),
}));

import { ExecutionContext } from '@nestjs/common';

jest.mock('../src/common/guards/auth.guard', () => {
  return {
    AuthGuard: class {
      canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        req.user = { sub: 'test-user-id', email: 'test@example.com' };
        return true;
      }
    },
  };
});

jest.mock('../src/common/guards/temporarily-blocked.guard', () => {
  return {
    TemporarilyBlockedGuard: class {
      canActivate() {
        return true;
      }
    },
  };
});
