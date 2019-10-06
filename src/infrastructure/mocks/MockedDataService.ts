import { DataService } from "../../application/services/DataService";

export class MockedDataService implements DataService {
	fetch(cacheKey: string): Promise<string> {
		throw new Error("Method not implemented.");
	}
}
