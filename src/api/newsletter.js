import { basePath, apiVersion } from './config';

export function suscribeNewsletterApi(email) {
    const url = `${basePath}/${apiVersion}/suscribe-newsletter/${email}`;

    const params = {
        method: 'POST',
    };

    return fetch(url, params)
        .then(response => response.json())
        .then(result => result)
        .catch(err => err)
}