import axios, {AxiosRequestConfig} from "axios";

export const http = axios.create({
    withCredentials: true,
});

export async function getJson<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await http.get<T>(url, config)
    return response.data
}

export async function getText(url: string, config?: AxiosRequestConfig): Promise<string> {
    const response = await http.get<string>(url, {
        ...config,
        responseType: "text",
    })
    return response.data
}

export async function postJson<TRequest, TResponse>(url: string, body: TRequest, config?: AxiosRequestConfig): Promise<TResponse> {
    const response = await http.post<TResponse>(url, body, config)
    return response.data
}

export async function postVoid<TRequest = undefined>(url: string, body?: TRequest, config?: AxiosRequestConfig): Promise<void> {
    await http.post(url, body, config)
}