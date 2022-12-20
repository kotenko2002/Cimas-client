import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";

axios.defaults.baseURL = 'https://localhost:44316/';
const errorToaster = createToaster({
    type: 'error',
    position:'top-right',
    queue: true,
    maxToasts: 5
});

axios.interceptors.request.use(
    function (config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if(error.code == 'ERR_NETWORK') {
            errorToaster.show('Server not running');
        }

        switch (error.response.status) {
            case 400:
                const errors = error.response.data.errors;
                for (const key in errors) {
                    errors[key].forEach(item => errorToaster.show(item));
                }
                break;
            default:
                errorToaster.show(error.response.data.message);
                break;
        }
        return Promise.reject(error);
    }
);
