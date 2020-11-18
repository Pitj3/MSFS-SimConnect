import { ObjectResponse, ResponseStatuses } from "../types/ApiResponses"
import moment from "moment";
import { UserError } from "../types/UserError";

const API_URL = "http://localhost:12345";

export enum RequestMethods {
	Get = 1,
	Post = 2,
	Put = 3,
	Delete = 4
}

export module Api {
    export const ApiVersion: string = "1";

	export async function setCartTipAmountAsync(cartToken: string, tipAmount: number) {
		console.log("setting tip amount to " + tipAmount);
		if (tipAmount == null) {
			throw new Error("Invalid tip amount.");
		}

		let results = await sendRequest(RequestMethods.Put, `Carts/${cartToken}/TipAmount`, tipAmount);

		return await processResponse<void>(results);
	}

	export function getMethodString(method: RequestMethods): string {
		if (method == null)
			return "";

		switch (+method) {
			case +RequestMethods.Get:
				return "GET";

			case +RequestMethods.Put:
				return "PUT";

			case +RequestMethods.Post:
				return "POST";

			case +RequestMethods.Delete:
				return "DELETE";

			default:
				return "";
		}
	}

	export async function sendRequest(method: RequestMethods, path: string, body: any = null, query: any | null = null): Promise<Response> {
		if (+method === +RequestMethods.Get) {
			if (body != null) {
				// If the caller is trying to pass data through the request's body, but this is a Get request (which cannot have a body), append the body object's properties to the query string.
				if (query == null)
					query = body;
				else
					query = Object.assign(query, body);

				body = null;
			}
		}

		if (query != null) {
            let qStringParams: string[] = [];

            for (let key of Object.keys(query)) {
                if (query[key] == null)
                    continue;

                if (Array.isArray(query[key])) {
                    if ((query[key] as any[]).length === 0)
                        continue;

                    qStringParams.push(query[key].map((arrayItem) => encodeURIComponent(key) + "=" + encodeURIComponent(arrayItem)).join("&"));
                } else
				    qStringParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(query[key]));
            }

			let qs = qStringParams.join('&');

			if (qs.length > 0) {
				if (path.indexOf('?') === -1)
					path += '?' + qs;
				else
					path += '&' + qs;
			}
		}

		let headers = {
			"Content-Type": "application/json; charset=utf-8",
			"Accept": "application/json,text/plain"
		};

		const url = API_URL;

		let results = await fetch(url + path, {
			method: getMethodString(method),
			cache: "no-cache",
			credentials: "same-origin",
			mode: "cors",
			headers: headers,
			referrer: "no-referrer",
			body:  (body != null ? JSON.stringify(body, serialize) : null),
		});

		if (!results.ok) {
			if ((results.type === "cors" || results.type.indexOf("text/plain") !== -1) && results.statusText === "expired") {
				throw new ApiError(results.status, "Your session has expired.");

			} else if (results.statusText === "old_version") {
				// Client version is less than the minimum version.
				alert("There is a new version of this website available.\nThis website will restart automatically in order to load the new version.");

				setTimeout(() => {
					window.location.reload();
				}, 3000);

				throw new ApiError(results.status, "There is a new version of this website available. This website will restart automatically in order to load the new version.");
			}
		}

		return results;
	}

	export async function processResponse<T>(results: Response): Promise<T> {
		if (!results.ok) {
			console.warn("Request failed with a status code of: " + results.status);
			throw new ApiError(results.status, "An error has occurred.");
		}

		let response = (await results.json()) as ObjectResponse<T>;

		if (response == null) {
			throw new ApiError(500, "No response received.");

		} else if (response.status != ResponseStatuses.SUCCESS) {
			if (response.status == ResponseStatuses.FAIL) {
				console.warn("Request failed with user message: " + response.reason);
				throw new UserError(response.reason);

			} else {
				console.warn("Request failed with message: " + response.reason);
				throw new Error(response.reason);
			}
		}

		return (response.data as T);
	}

	export function parseApiObject<T>(apiObject: T): T {
		if (apiObject == null)
			return apiObject;

		if ((typeof apiObject === "object") && Array.isArray(apiObject)) {
			for (let i = 0, len = apiObject.length; i < len; ++i)
				apiObject[i] = parseApiObject(apiObject[i]);

			return apiObject;
		}

		for (let strKey in apiObject) {
			if (!(apiObject as Object).hasOwnProperty(strKey))
				continue;

			let objProp = apiObject[strKey];

			if (objProp != null) {
				if ((typeof objProp === "string") && (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/g).test(objProp)) {
					// Date-time field.
                    let dt = objProp.split(/[^0-9]/);

                    let parsed = new Date (+dt[0], +dt[1] - 1, +dt[2], +dt[3], +dt[4], +dt[5]);

                    (apiObject as any)[strKey] = parsed;

				} else if ((typeof objProp === "object") && Array.isArray(objProp)) {
					for (let i = 0, len = objProp.length; i < len; ++i)
						apiObject[strKey] = parseApiObject(apiObject[strKey]);

				} else if (typeof objProp === "object") {
					apiObject[strKey] = parseApiObject(apiObject[strKey]);
				}
			}
		}

		return apiObject;
	}
}

export class ApiError extends Error {
	status: number;
	statusText: string;

	constructor(status?: number, statusText?: string) {
		if (statusText == null)
			statusText = "API Error";

		super(statusText);

		this.status = status;
		this.statusText = statusText;
	}
}

function serialize(key, value) {
	if (value == null)
		return null;

	if (this != null && this.hasOwnProperty(key) && Object.prototype.toString.call(this[key]) === '[object Date]') {
		let date = moment(this[key]);

		return date.format("YYYY-MM-DDTHH:mm:ss");
	}

	return value;
}
