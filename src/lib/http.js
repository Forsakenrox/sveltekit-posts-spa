import { authStore } from "./stores/authStore";
import { get } from "svelte/store";
import { errorsStore } from "./stores/errorsStore";
import axios from "axios";
export class Http {
    static async request(config) {
        const basePath = "http://127.0.0.1:8000"
        let auth = get(authStore);
        let IsRequestBased = config.url.startsWith(basePath);
        // console.log(IsRequestBased);
        if (IsRequestBased) {
            config = { ...config, headers: { 'Authorization': 'Bearer ' + auth.token } }
        }
        try {
            const response = await axios(config);
            errorsStore.reset();
            return response.data;
        } catch (err) {
            if (err.response) {
                // The client was given an error response (5xx, 4xx)
                //Токен просрочен\отсутствует
                if (err.response.status == 401) {
                    errorsStore.update(() => err.response.data);
                    console.log(IsRequestBased);
                    if (IsRequestBased) {
                        authStore.logout();
                    }

                }
                if (err.response.status == 422) {
                    errorsStore.update(() => err.response.data);
                }
            } else if (err.request) {
                errorsStore.update(() => err.request.responseText);
                // The client never received a response, and the request was never left
            }
            return [];
        }
    }
};
// export let Http = http();