import { RemoveWholeCacheUsecase } from "../../../src/application/usecases/RemoveWholeCacheUsecase";

import { MockedCacheService } from "../../../src/infrastructure/mocks/MockedCacheService";

test('Validate that the previously existing key is being removed', async () => {
	const cacheService = new MockedCacheService();
	await cacheService.setCache('KEY', 'VALUE');

	expect(await cacheService.getCache('KEY')).not.toBeNull();

	const usecase = new RemoveWholeCacheUsecase(cacheService);
	await usecase.invoke();

	expect(await cacheService.getCache('KEY')).toBeNull();
});

test('Validate that the previously non existing key is not causing an exception', async () => {
	const cacheService = new MockedCacheService();

	expect(await cacheService.getCache('KEY')).toBeNull();

	const usecase = new RemoveWholeCacheUsecase(cacheService);
	await usecase.invoke();

	expect(await cacheService.getCache('KEY')).toBeNull();
});
