import axios from 'axios'
import { get } from "svelte/store";
import { authStore } from '$lib/stores/authStore'
import { errorsStore } from '$lib/stores/errorsStore';
// import { Model } from 'vue-api-query'
import { Model as BaseModel } from 'vue-api-query'

BaseModel.$http = axios.create()

// inject global axios instance as http client to Model

export default class Model extends BaseModel {
    // Define a base url for a REST API

    baseURL() {
        return 'http://127.0.0.1:8000/api'
    }

    // Implement a default request method
    async request(config) {
        let auth = get(authStore);
        if (config.url.startsWith(this.baseURL())) {
            config.headers = { 'Authorization': 'Bearer ' + auth.token };
        }
        try {
            const response = await this.$http.request(config);
            errorsStore.reset();
            return response.data;
        } catch (err) {
            if (err.response) {
                // The client was given an error response (5xx, 4xx)
                //Токен просрочен\отсутствует
                if (err.response.status == 401) {
                    errorsStore.update(() => err.response.data);
                    if (config.url.startsWith(this.baseURL())) {
                        authStore.logout();
                    }
                }
                //Валидация не проходит
                if (err.response.status == 422) {
                    errorsStore.update(() => err.response.data);
                }
            } else if (err.request) {
                errorsStore.update(() => err.request.responseText);
                // The client never received a response, and the request was never left
            } else {

            }
            return data;
        }
    }
}