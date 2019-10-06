import { MockedCacheService } from "../../../src/infrastructure/mocks/MockedCacheService";

import { RemoveCacheUsecase } from "../../../src/application/usecases/RemoveCacheUsecase";

test('Validate that the previously existing key is being removed', async () => {
	const cacheService = new MockedCacheService();
	await cacheService.setCache('KEY', 'VALUE');

	expect(await cacheService.getCache('KEY')).not.toBeNull();

	const usecase = new RemoveCacheUsecase(cacheService);
	await usecase.invoke({ cacheKey: 'KEY' });

	expect(await cacheService.getCache('KEY')).toBeNull();
});

test('Validate that the previously non existing key is not causing an exception', async () => {
	const cacheService = new MockedCacheService();

	expect(await cacheService.getCache('KEY')).toBeNull();

	const usecase = new RemoveCacheUsecase(cacheService);
	await usecase.invoke({ cacheKey: 'KEY' });

	expect(await cacheService.getCache('KEY')).toBeNull();
});
