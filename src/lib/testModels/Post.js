import Model from '$lib/testModels/Model'

export default class Post extends Model {
    // Set the resource route of the model
    resource() {
        return 'posts'
    }
}