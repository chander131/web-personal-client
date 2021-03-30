import { basePath, apiVersion } from './config';

export function getCoursesApi() {
    const url = `${basePath}/${apiVersion}/get-courses`;

    return fetch(url)
        .then(response => response.json())
        .then(result => result)
        .catch(err => err);
}

export function getCourseDataUdemyApi(id) {
    const baseUrl = `https://www.udemy.com/api-2.0/courses/${id}`;
    const coursesParams = `?fields[course]=title,headline,url,price,image_480x270`;
    const url = baseUrl + coursesParams;

    return fetch(url)
        .then(async response => {
            return { code: response.status, data: await response.json() }
        }).then(result => result)
        .catch(err => err);
}

export function deleteCourseApi(token, id) {
    const url = `${basePath}/${apiVersion}/delete-course/${id}`;

    const params = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    }

    return fetch(url, params)
        .then(response => response.json())
        .then(result => result)
        .catch(err => err);
}

