import { generate } from "randomstring";
import { DataService } from "../../application/services/DataService";

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export class MockedDataService implements DataService {
	public async fetch(cacheKey: string): Promise<string> {
		await delay(Math.random() * 1000);
		return generate({ readable: true, length: 100 });
	}
}
