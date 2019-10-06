export interface CacheRetrievalParameters {
	readonly cacheKey: string;
}

export interface CacheUpdateParameters extends CacheRetrievalParameters {
	readonly cacheValue: string;
}
