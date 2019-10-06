export interface CacheService {
	setCache(cacheKey: string, data: string): Promise<void>;
	getCache(cacheKey: string): Promise<string | null>;
	getCacheKeys(): Promise<string[]>;
	deleteCache(cacheKey: string): Promise<void>;

}
