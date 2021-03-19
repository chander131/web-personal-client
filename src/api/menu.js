import { basePath, apiVersion } from './config';

export function getMenuApi() {
    const url = `${basePath}/${apiVersion}/get-menus`;

    return fetch(url)
        .then(response => response.json())
        .then(result => result)
        .catch(err => err.message)
}

export function updateMenuApi(token, menuId, data) {
    const url = `${basePath}/${apiVersion}/update-menu/${menuId}`;
    const params = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify(data),
    };

    return fetch(url, params)
        .then(response => response.json())
        .then(result => result.message)
        .catch(err => err.message)
}

export function activateMenuApi(token, menuId, status) {
    const url = `${basePath}/${apiVersion}/activate-menu/${menuId}`;

    const params = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({ active: status }),
    }

    return fetch(url, params)
        .then(response => response.json())
        .then(result => result.message)
        .catch(err => err.message)
}

export function addMenuApi(token, menu) {
    const url = `${basePath}/${apiVersion}/add-menu`;
    
    const params = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify(menu),
    }

    return fetch(url, params)
        .then(response => response.json())
        .then(result => result.message)
        .catch(err => err.message)
}

export function deleteMenuApi(token, menuId) {
    const url = `${basePath}/${apiVersion}/delete-menu/${menuId}`;
    
    const params = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            Authorization: token,
        },
    }

    return fetch(url, params)
        .then(response => response.json())
        .then(result => result.message)
        .catch(err => err.message)
}
