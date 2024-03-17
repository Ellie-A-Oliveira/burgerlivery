
const URL = "http://localhost:8000";
enum METHODS {
    CONNECT = 'CONNECT',
    DELETE = 'DELETE',
    GET = 'GET',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT',
    TRACE = 'TRACE',
}

interface ApiOptions {
    returnFullRequest?: boolean
}

export class ApiService {
    public async request<T>(
        uri: string,
        method: METHODS = METHODS.GET,
        options?: ApiOptions
    ): Promise<Response | Awaited<T>> {
        const fullUrl = URL + uri;
        const headers = new Headers({
            "Content-Type": "application/json; charset=UTF-8",
        });

        const response = await fetch(fullUrl, { method, headers });

        if (options?.returnFullRequest) {
            return response;
        }

        return response.json();
    }
}