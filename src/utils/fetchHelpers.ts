import { apiUrl } from "../config";

// Te wszystkie typy przydałoby się przenieść do typów na BE

export interface ResponseProblem {
    error: string;
    message?: string | string[];
}

export type Method = 'POST' | 'DELETE' | 'PATCH' | 'PUT' | 'GET';

export interface ClientResponseOk<T> {
    status: true;
    results: T;
}
export interface ClientResponseError {
    status: false;
    error: string;
    message?: string | string[];
}
export type ClientResponse<T> = ClientResponseOk<T> | ClientResponseError;

export interface ClientApiResponseOk<T> {
    status: true;
    results: T;
    amount?: number;
}
export interface ClientApiResponseError {
    status: false;
    error: string;
}
export type ClientApiResponse<T> = ClientApiResponseOk<T> | ClientApiResponseError;

//

const showProblem = (res: ResponseProblem): ClientResponseError => {
    console.warn(res.error);
    if (res.message) return { error: res.error, status: false, message: res.message };
    return { error: res.error, status: false };
};



// fetchTool używacie do wszystkich fetchy, które nie mają na celu pobrania danych

export const fetchTool = async <T>(path: string, method: Method = 'GET', body: any = undefined): Promise<ClientResponse<T>> => {
    try {
        const response = await fetch(`${apiUrl}/${path}`, {
            method,
            headers: ['POST', 'PATCH', 'PUT', 'DELETE'].includes(method) ? { 'Content-Type': 'application/json' } : undefined,
            body: body && JSON.stringify(body),
            credentials: 'include',
        });
        const res = await response.json();
        if (response.ok) return { results: res, status: true };
        return showProblem(res);
    } catch (e) {
        return { error: 'Wystąpił błąd. Spróbuj jeszcze raz.', status: false };
    }
};



// fetchApiTool uzywacie do pobierania danych z backendu np. kiedy potrzebujecie pobrać listę kursantów, albo dane dotyczące konkretnego kursanta

export const fetchApiTool = async <T>(path: string): Promise<ClientApiResponse<T>> => {
    try {
        const response = await fetch(`${apiUrl}/${path}`, {
            credentials: 'include',
        });
        const res = await response.json();
        if (response.ok) return res?.results ? { ...res, status: true } : { results: res, status: true };
        return showProblem(res);
    } catch (e) {
        return { error: 'Wystąpił błąd. Spróbuj jeszcze raz.', status: false };
    }
};
