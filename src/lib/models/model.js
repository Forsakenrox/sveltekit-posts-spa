import axios from "axios";
import { errors } from "$lib/stores/errors";
export class Model {

    url = "http://127.0.0.1/";
    // id = null;
    // constructor(props) {
    //     this.id = props.id;
    // }

    async all() {
        const response = await axios.get(this.url).then(
            (response) => response,
            (response) => response
        );
        return response.data;
    }
    async find(id) {
        const response = await axios.get(this.url + id).then(
            (response) => response,
            (response) => response
        );
        return response.data;
    }
    async delete(id) {
        const response = await axios.delete(this.url + id).then(
            (response) => response,
            (response) => response
        );
        if (response.status == 200) {
            return true;
        } else {
            return false;
        }
    }
    async create(model) {
        console.log(123);
        const response = await axios.post(this.url, model).then(
            (response) => response,
            (response) => response.response
        );

        if (response.status == 200) {
            return true;
        } else if (response.status == 422) {
            errors.update(errors => response.data);
            return false;
        }
    }
    async update(model) {

        const response = await axios.patch(this.url + model.id, model).then(
            (response) => response,
            (response) => response.response
        );

        if (response.status == 200) {
            return true;
        } else if (response.status == 422) {
            errors.update(errors => response.data);
            return false;
        }
    }
}