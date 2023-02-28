const cohortId = "plus-cohort-21";
const authorizationToken = '5f1ab82b-8276-47b6-b3a1-f02adb1b99ae';
const config = {
    baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
    headers: {
        authorization: authorizationToken,
        'Content-Type': 'application/json'
    }
}

function getResponseData(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => getResponseData(res));
    }
export const getDataProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => getResponseData(res));
}

export const updateDataProfile = (name,about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        }),
    })
        .then(res => getResponseData(res));
}

export const addDataCard = (name,link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        }),
    })
        .then(res => getResponseData(res));
}

export const updateDataProfileAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar
        }),
    })
        .then(res => getResponseData(res));
}

export const deleteDataCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => getResponseData(res));
}

export const deleteLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => getResponseData(res));
}

export const putLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(res => getResponseData(res));
}

