import { AuthotizationMiddleware } from './authotization.middleware';

describe('AuthotizationMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthotizationMiddleware()).toBeDefined();
  });
});
