import { UpdateCacheUsecase } from "../../../src/application/usecases/UpdateCacheUsecase";

import { CacheService } from "../../../src/application/services/CacheService";

test('Validate that when the usecase is called, the cache is updated', async () => {
	const cacheClearer = jest.fn().mockImplementation(() => Promise.resolve());
	const cacheGetter = jest.fn().mockImplementation(() => Promise.resolve(null));
	const cacheKeysGetter = jest.fn().mockImplementation(() => Promise.resolve([]));

	const cache: { [key: string]: string } = {};

	const cacheService: CacheService = {
		clearCache: cacheClearer,
		setCache: async (key, value) => { cache[key] = value; },
		getCache: cacheGetter,
		getCacheKeys: cacheKeysGetter,
		deleteCache: cacheClearer
	};

	const usecase = new UpdateCacheUsecase(cacheService);

	await usecase.invoke({ cacheKey: 'CACHE_KEY', cacheValue: 'CACHE_VALUE' });

	expect(cache).toStrictEqual({
		'CACHE_KEY': 'CACHE_VALUE'
	});

	await usecase.invoke({ cacheKey: 'CACHE_KEY2', cacheValue: 'CACHE_VALUE2' });


	expect(cache).toStrictEqual({
		'CACHE_KEY': 'CACHE_VALUE',
		'CACHE_KEY2': 'CACHE_VALUE2'
	});

	await usecase.invoke({ cacheKey: 'CACHE_KEY', cacheValue: 'CACHE_VALUE4' });

	expect(cache).toStrictEqual({
		'CACHE_KEY': 'CACHE_VALUE4',
		'CACHE_KEY2': 'CACHE_VALUE2'
	});

	expect(cacheGetter.mock.calls.length).toStrictEqual(0);
	expect(cacheClearer.mock.calls.length).toStrictEqual(0);
	expect(cacheKeysGetter.mock.calls.length).toStrictEqual(0);
});
