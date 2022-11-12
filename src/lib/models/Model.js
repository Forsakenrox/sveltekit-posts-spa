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

            function isJsonString(str) {
                try {
                    JSON.parse(str);
                } catch (e) {
                    return false;
                }
                return true;
            }
            //Если ответ содержит коллекцию
            if (response?.data?.data) {
                return response.data;
                //Если коллекции нет, но есть какой то json
                // } else if (isJsonString(response.data)) {
            } else if (response?.data) {
                // {data: response.data}
                // response.data.data = 1;
                return { data: response.data };
            } else {
                return { data: "ok" };
            };
        } catch (err) {
            console.log(err.code);
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
                else if (err.response.status == 422) {
                    errorsStore.update(() => err.response.data);
                }
                //Ошибки в запросе
                else if (err.response.status == 400) {
                    errorsStore.update(() => err.response.data);
                }
                //Урл не найден
                else if (err.response.status == 404) {
                    errorsStore.update(() => err?.response?.data || ({ message: "Not Found 404" }));
                }
                //Ошибка сервера
                else if (err.response.status == 500) {
                    errorsStore.update(() => err?.response?.data || ({ message: "Server error" }));
                } else {
                    errorsStore.update(() => ({ message: "необработанная ошибка клиента 400-500" }));
                }
            } else if (err) {
                // The client never received a response, and the request was never left
                //Ошибка сети (нет связи)
                console.log(err);
                if (err.code == "ERR_NETWORK") {
                    errorsStore.update(() => err);
                } else {
                    errorsStore.update(() => err?.request?.responseText || ({ message: "Some network or code errors" }));
                }
            }
            return { data: "" };
        }
    }
}