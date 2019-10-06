import { RetrieveCacheUsecase } from "../../../src/application/usecases/RetrieveCacheUsecase";
import { DataService } from "../../../src/application/services/DataService";
import { CacheService } from "../../../src/application/services/CacheService";
import { LoggingService } from "../../../src/application/services/LoggingService";

test('Validate that when the cache is missed, the data service, log services are being called and cache is being set', async () => {
	const dataFetcher = jest.fn().mockImplementation(() => Promise.resolve('CACHE_VALUE'));
	const cacheClearer = jest.fn().mockImplementation(() => Promise.resolve());
	const cacheSetter = jest.fn().mockImplementation(() => Promise.resolve());
	const cacheGetter = jest.fn().mockImplementation(() => Promise.resolve(null));
	const cacheKeysGetter = jest.fn().mockImplementation(() => Promise.resolve([]));

	const logger = jest.fn().mockImplementation(() => Promise.resolve());

	const dataService: DataService = {
		fetch: dataFetcher
	};

	const cacheService: CacheService = {
		clearCache: cacheClearer,
		setCache: cacheSetter,
		getCache: cacheGetter,
		getCacheKeys: cacheKeysGetter,
		deleteCache: cacheClearer
	};

	const loggService: LoggingService = {
		info: logger
	}

	const usecase = new RetrieveCacheUsecase(dataService, cacheService, loggService);

	const response = await usecase.invoke({ cacheKey: 'CACHE_KEY' });

	expect(response).toStrictEqual('CACHE_VALUE');

	expect(dataFetcher.mock.calls.length).toStrictEqual(1);
	expect(dataFetcher.mock.calls[0][0]).toStrictEqual('CACHE_KEY');

	expect(cacheSetter.mock.calls.length).toStrictEqual(1);
	expect(cacheSetter.mock.calls[0][0]).toStrictEqual('CACHE_KEY');
	expect(cacheSetter.mock.calls[0][1]).toStrictEqual('CACHE_VALUE');

	expect(cacheGetter.mock.calls.length).toStrictEqual(1);
	expect(cacheGetter.mock.calls[0][0]).toStrictEqual('CACHE_KEY');

	expect(cacheClearer.mock.calls.length).toStrictEqual(0);
	expect(cacheKeysGetter.mock.calls.length).toStrictEqual(0);

	expect(logger.mock.calls.length).toStrictEqual(1);
	expect(logger.mock.calls[0][0]).toStrictEqual('Cache miss');
});



test('Validate that when the cache is hit, the log service is being called and cache is not being set', async () => {
	const dataFetcher = jest.fn().mockImplementation(() => Promise.resolve('CACHE_VALUE'));
	const cacheClearer = jest.fn().mockImplementation(() => Promise.resolve());
	const cacheSetter = jest.fn().mockImplementation(() => Promise.resolve());
	const cacheGetter = jest.fn().mockImplementation(() => Promise.resolve('CACHE_VALUE'));
	const cacheKeysGetter = jest.fn().mockImplementation(() => Promise.resolve([]));

	const logger = jest.fn().mockImplementation(() => Promise.resolve());

	const dataService: DataService = {
		fetch: dataFetcher
	};

	const cacheService: CacheService = {
		clearCache: cacheClearer,
		setCache: cacheSetter,
		getCache: cacheGetter,
		getCacheKeys: cacheKeysGetter,
		deleteCache: cacheClearer
	};

	const loggService: LoggingService = {
		info: logger
	}

	const usecase = new RetrieveCacheUsecase(dataService, cacheService, loggService);

	const response = await usecase.invoke({ cacheKey: 'CACHE_KEY' });

	expect(response).toStrictEqual('CACHE_VALUE');

	expect(dataFetcher.mock.calls.length).toStrictEqual(0);

	expect(cacheSetter.mock.calls.length).toStrictEqual(0);

	expect(cacheGetter.mock.calls.length).toStrictEqual(1);
	expect(cacheGetter.mock.calls[0][0]).toStrictEqual('CACHE_KEY');

	expect(cacheClearer.mock.calls.length).toStrictEqual(0);
	expect(cacheKeysGetter.mock.calls.length).toStrictEqual(0);

	expect(logger.mock.calls.length).toStrictEqual(1);
	expect(logger.mock.calls[0][0]).toStrictEqual('Cache hit');
});
