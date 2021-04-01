import { basePath, apiVersion } from './config';

export function getPostsApi(limit, page) {
    const url = `${basePath}/${apiVersion}/get-posts?limit=${limit}&page=${page}`;

    return fetch(url)
        .then(response => response.json())
        .then(result => result)
        .catch(err => err);
}
