import { LoggingService } from "../../application/services/LoggingService";

export class MockedLoggingService implements LoggingService {
	public async info(information: string): Promise<void> {
		console.log(information);
	}
}
