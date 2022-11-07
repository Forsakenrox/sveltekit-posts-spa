import axios from "axios";
import { errors } from "$lib/stores/errors";
export class Model {

    url = "http://127.0.0.1/";
    config = undefined;

    all() {

        this.config = {
            url: this.url,
            method: "GET",
        };
        return this.handleRequest();
    }

    find(id) {
        this.config = {
            url: this.url + id,
            method: "GET",
        };
        return this.handleRequest();
    }

    update(model) {
        this.config = {
            url: this.url + model.id,
            method: "PATCH",
            data: model,
        };
        return this.handleRequest();
    }

    delete(id) {
        this.config = {
            url: this.url + id,
            method: "DELETE",
        };
        return this.handleRequest();
    }

    create(model) {
        this.config = {
            url: this.url,
            method: "POST",
            data: model
        };
        return this.handleRequest();
    }

    async handleRequest() {
        try {
            const response = await axios(this.config);
            errors.reset();
            return response.data;
        } catch (err) {
            if (err.response) {
                // The client was given an error response (5xx, 4xx)
                if (err.response.status == 422) {
                    errors.update(() => err.response.data);
                }
            } else if (err.request) {
                errors.update(() => err.request.responseText);
                // The client never received a response, and the request was never left
            }
            return err;
        }
    }
}