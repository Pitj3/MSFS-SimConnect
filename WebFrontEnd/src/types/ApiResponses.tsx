
export enum ResponseStatuses {
	SUCCESS = "success",
	FAIL = "fail",
	INTERNAL_ERROR = "internal_error",
	UNAUTHORIZED = "unauthorized",
}

export interface ObjectResponse<T> {
	status: ResponseStatuses;
	reason: string;
	data: T;
}
