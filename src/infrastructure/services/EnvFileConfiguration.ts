import { config } from 'dotenv';

import { Configuration } from "../../application/services/Configuration";

export class EnvFileConfiguration implements Configuration {
	constructor() {
		config();
	}

	getPort(): number {
		return Number(process.env.PORT);
	}

	getCacheMaxSize(): number {
		return Number(process.env.CACHE_MAX_SIZE);
	}

	getTimeToLeave(): number {
		return Number(process.env.CACHE_TTL);
	}

	getMongoConnectionUrl(): string {
		return String(process.env.MONGO_CONNECTION_URL);
	}

	getMongoDatabaseName(): string {
		return String(process.env.MONGO_DATABASE_NAME);
	}
}
