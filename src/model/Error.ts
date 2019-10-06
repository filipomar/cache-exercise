export enum ErrorType {
	UNEXPECTED = "UNEXPECTED"
}

export class GenericError {
	public readonly type: ErrorType;

	constructor(type: ErrorType) {
		this.type = type;
	}
}
