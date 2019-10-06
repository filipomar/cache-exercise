type CacheKey = {
	readonly cacheKey: string;
};

type CacheValue = {
	readonly cacheValue: string;
};


export type CacheRetrievalParameters = CacheKey;
export type CacheRemovalParameters = CacheKey;
export type CacheUpdateParameters = CacheKey & CacheValue;
