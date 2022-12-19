import axios from "axios";

axios.defaults.baseURL = 'https://localhost:44316/';

axios.interceptors.request.use(
    function (config) {
        /*if(localStorage.getItem('token')) {

        }*/
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    function (error) {
        console.log(error);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        console.log(error);
        return Promise.reject(error);
    }
);

function refreshToken() {

}