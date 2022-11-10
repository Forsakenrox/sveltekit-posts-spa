import axios from 'axios'
import { get } from "svelte/store";
import { authStore } from '$lib/stores/authStore'
// import { Model } from 'vue-api-query'
import { Model as BaseModel } from 'vue-api-query'

let auth = get(authStore);

BaseModel.$http = axios.create()

// inject global axios instance as http client to Model

export default class Model extends BaseModel {
    // Define a base url for a REST API
    baseURL() {
        return 'http://127.0.0.1:8000/api'
    }

    // Implement a default request method
    request(config) {
        config.headers = { 'Authorization': 'Bearer ' + auth.token };
        // config = { ...config, headers: { 'Authorization': 'Bearer ' + auth.token } };
        return this.$http.request(config)
    }
}