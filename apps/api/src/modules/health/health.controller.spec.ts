import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('returns ok status from liveness endpoint', () => {
    const controller = new HealthController({} as never, {} as never, {} as never);
    const result = controller.getHealth();

    expect(result.status).toBe('ok');
    expect(result.service).toBe('uandv-api');
    expect(result.timestamp).toBeDefined();
  });
});
