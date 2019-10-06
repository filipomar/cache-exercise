export interface DataService {
	fetch(cacheKey: string): Promise<string>;

}
