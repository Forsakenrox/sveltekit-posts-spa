import { post } from '$lib/models/post';

// /** @type {import('./$types').PageLoad} */
// export function load({ params }) {
//     return {
//         posts: {
//             title: `Title for ${params.slug} goes here`,
//             content: `Content for ${params.slug} goes here`
//         }
//     };
// }

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    return {
        posts: await post.all(),
    };
}