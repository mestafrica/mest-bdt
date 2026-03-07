import { ExecutionContext } from '@nestjs/common';
import { CurrentUser } from './user.decorator';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

describe('CurrentUser Decorator', () => {
  function getParamDecoratorFactory(decorator: (...args: any[]) => any) {
    class Test {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      public test(@decorator() _value: any) {}
    }

    const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
    return args[Object.keys(args)[0]].factory as (...args: any[]) => any;
  }

  it('should extract user from request', () => {
    const factory = getParamDecoratorFactory(CurrentUser);
    const mockUser = { email: { address: 'test@test.com' } };
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: mockUser,
        }),
      }),
    } as ExecutionContext;

    const result = factory(null, mockContext);
    expect(result).toEqual(mockUser);
  });
});
