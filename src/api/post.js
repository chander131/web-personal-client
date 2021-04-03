import { basePath, apiVersion } from './config';

export function getPostsApi(limit, page) {
    const url = `${basePath}/${apiVersion}/get-posts?limit=${limit}&page=${page}`;

    return fetch(url)
        .then(response => response.json())
        .then(result => result)
        .catch(err => err);
}

export function getPostByUrlApi(urlPost) {
    const url = `${basePath}/${apiVersion}/get-post/${urlPost}`;

    return fetch(url)
        .then(response => response.json())
        .then(result => result)
        .catch(err => err);
}

export function deletePostApi(token, id) {
    const url = `${basePath}/${apiVersion}/delete-post/${id}`;
    const params = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        }
    };

    return fetch(url, params)
        .then(response => response.json())
        .then(result => result)
        .catch(err => err);
}

export function addPostApi(token, post) {
    const url = `${basePath}/${apiVersion}/add-post`;
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify(post),
    };

    return fetch(url, params)
        .then(response => response.json())
        .then(result => result)
        .catch(err => err);
}

export function updatePostApi(token, id, post) {
    const url = `${basePath}/${apiVersion}/update-post/${id}`;
    const params = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify(post),
    };

    return fetch(url, params)
        .then(response => response.json())
        .then(result => result)
        .catch(err => err);
}
