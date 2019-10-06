import { MockedCacheService } from "../../../src/infrastructure/mocks/MockedCacheService";

import { RetrieveCacheKeysUsecase } from "../../../src/application/usecases/RetrieveCacheKeysUsecase";

test('Validate that adding cached objects results in more keys', async () => {
	const cacheService = new MockedCacheService();
	const usecase = new RetrieveCacheKeysUsecase(cacheService);
	expect(await await usecase.invoke()).toStrictEqual([]);
	await cacheService.setCache('KEY', 'VALUE');
	expect(await await usecase.invoke()).toStrictEqual(['KEY']);
});

test('Validate that keys are colliding', async () => {
	const cacheService = new MockedCacheService();
	const usecase = new RetrieveCacheKeysUsecase(cacheService);
	expect(await await usecase.invoke()).toStrictEqual([]);
	await cacheService.setCache('KEY', 'VALUE');
	expect(await await usecase.invoke()).toStrictEqual(['KEY']);
	await cacheService.setCache('KEY', 'VALUE');
	expect(await await usecase.invoke()).toStrictEqual(['KEY']);
});
