import axios from "axios";
import { Http } from "$lib/http";
import { errorsStore } from "$lib/stores/errorsStore";
export class Model {

    url = "http://127.0.0.1/";
    config = undefined;

    all() {
        this.config = {
            url: this.url,
            method: "GET",
        };
        return Http.request(this.config);
        // return this.handleRequest();
    }

    find(id) {
        this.config = {
            url: this.url + id,
            method: "GET",
        };
        return Http.request(this.config);
    }

    update(model) {
        this.config = {
            url: this.url + model.id,
            method: "PATCH",
            data: model,
        };
        return Http.request(this.config);
    }

    delete(id) {
        this.config = {
            url: this.url + id,
            method: "DELETE",
        };
        return Http.request(this.config);
    }

    create(model) {
        this.config = {
            url: this.url,
            method: "POST",
            data: model
        };
        return Http.request(this.config);
    }

    // async handleRequest() {
    //     try {
    //         const response = await axios(this.config);
    //         errors.reset();
    //         return response.data;
    //     } catch (err) {
    //         if (err.response) {
    //             // The client was given an error response (5xx, 4xx)
    //             if (err.response.status == 422) {
    //                 errors.update(() => err.response.data);
    //             }
    //         } else if (err.request) {
    //             errors.update(() => err.request.responseText);
    //             // The client never received a response, and the request was never left
    //         }
    //         return [];
    //     }
    // }
}