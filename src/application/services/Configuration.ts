export interface Configuration {
	getTimeToLeave(): number;
	getPort(): number;
	getCacheMaxSize(): number;
	getMongoConnectionUrl(): string;
	getMongoDatabaseName(): string;
}
