import { Test, TestingModule } from '@nestjs/testing';
import { TemporarilyBlockedGuard } from './temporarily-blocked.guard';
import { ExecutionContext, ServiceUnavailableException } from '@nestjs/common';

describe('TemporarilyBlockedGuard', () => {
  let guard: TemporarilyBlockedGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemporarilyBlockedGuard],
    }).compile();

    guard = module.get<TemporarilyBlockedGuard>(TemporarilyBlockedGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should throw ServiceUnavailableException', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          method: 'GET',
          url: '/test',
        }),
      }),
    } as ExecutionContext;

    expect(() => guard.canActivate(mockContext)).toThrow(
      ServiceUnavailableException,
    );
    expect(() => guard.canActivate(mockContext)).toThrow(
      'Endpoint GET /test is temporarily blocked',
    );
  });
});
