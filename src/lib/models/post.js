import { Model } from "./model";

class post extends Model {
    url = "http://127.0.0.1:8000/api/posts/";
};
export let Post = new post();