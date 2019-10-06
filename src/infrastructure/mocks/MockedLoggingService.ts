import { LoggingService } from "../../application/services/LoggingService";

export class MockedLoggingService implements LoggingService {
	info(information: string): Promise<void> {
		throw new Error("Method not implemented.");
	}


}
