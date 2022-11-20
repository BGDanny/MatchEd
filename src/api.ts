export const fetchApi = (path: string, method = "GET", body?: string) => {
    return fetch(
        "https://rvz8jherv5.execute-api.us-east-2.amazonaws.com" + path,
        {
            body,
            method,
        }
    );
};
