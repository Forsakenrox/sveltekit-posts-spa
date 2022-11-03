<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    let postId = $page.params.id;
    let post = [];

    onMount(async () => {
        await getPost();
    });

    async function getPost() {
        const response = await fetch("http://127.0.0.1:8000/api/posts/"+postId);
        post = await response.json();
    }
</script>
<svelte:head>
    <title>posts-id-lol</title>
</svelte:head>
<div>
    {#if post.id}
        <h1>{postId}</h1>
        <h1>{post.name}</h1>
        <p>{post.text}</p>
    {/if}
</div>
