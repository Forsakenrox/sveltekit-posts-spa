import { Model } from "./model";

class Post extends Model {
    url = "http://127.0.0.1:8000/api/posts/";
};
export let post = new Post();