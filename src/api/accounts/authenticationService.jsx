const axios = require('axios');
const endpoint = `${process.env.API_ACCOUNT_URL}v1/oauth/token`;

export const login = async (username, password) => {
    const clientId = `${process.env.CLIENT_ID}`;
    return await axios.post(endpoint, {
            username: username,
            password: password,
            client_id: parseInt(clientId),
            client_secret: `${process.env.CLIENT_SECRET}`,
        }).then(function (response) {
            if(response.status === 200){
                setToken(response.data.access_token)
                return response.data;
            }
        }).catch(function (error) {
            if (error.response !== undefined) {
                return error.response.data;
            }});
}
    export const setToken = (idToken) => {
        // Saves user token to localStorage
        return localStorage.setItem('horeca_token', idToken)
    }

    export const getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem('horeca_token')
    }

export const fetch = (url, options) => {
    // performs api calls sending the required authentication headers
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    if (this.loggedIn()){
        headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {
        headers,
        ...options
    })
        .then(this._checkStatus)
        .then(response => response.json())
}