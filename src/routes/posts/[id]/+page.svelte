<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { Skeleton } from "svelte-loading-skeleton";

    let postId = $page.params.id;
    let post = [];
    let isLoading = false;

    onMount(async () => {
        await getPost();
    });

    async function getPost() {
        isLoading = true;
        const response = await fetch("http://127.0.0.1:8000/api/posts/" + postId);
        post = await response.json();
        isLoading = false;
    }
</script>

<svelte:head>
    <title>posts-id-lol</title>
</svelte:head>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">Post number {$page.params.id}</h3>
    </div>
    <div class="card-body">
        <div class="bd-example">
            <div class="mb-3">
                <label for="formGroupExampleInput" class="form-label">Name</label>
                {#if isLoading}
                    <Skeleton />
                {:else}
                    <input bind:value={post.name} type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder" />
                {/if}
            </div>
            <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label">Text</label>
                {#if isLoading}
                    <Skeleton />
                {:else}
                    <textarea bind:value={post.text} type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" />
                {/if}
            </div>
        </div>
    </div>
    <!-- <div class="card-footer">
        {#if isLoading}
            <button class="btn btn-primary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                Saving...
            </button>
        {:else}
            <button on:click={save} class="btn btn-primary">Save</button>
        {/if}
    </div> -->
</div>

<!-- 
<div>
    {#if post.id}
        <h1>{postId}</h1>
        <h1>{post.name}</h1>
        <p>{post.text}</p>
    {/if}
</div> -->
