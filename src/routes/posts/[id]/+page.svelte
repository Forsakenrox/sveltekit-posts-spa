<script>
    import { errors } from "$lib/stores/errors";
    import { post as Post } from "$lib/models/post.js";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { Skeleton } from "svelte-loading-skeleton";
    import Button from "$lib/components/button.svelte";

    let postId = $page.params.id;
    let post = [];
    let isLoading = false;
    let isLoadingButton = false;
    let isDisabled = true;

    onMount(async () => {
        await getPost();
    });

    async function getPost() {
        isLoading = true;
        post = await Post.find(postId);
        isLoading = false;
    }

    async function update() {
        isLoadingButton = true;
        await Post.update(post);
        isLoadingButton = false;
    }

    $: isDisabled = post.id == undefined;
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
                {#if $errors?.errors?.name}
                    {#each $errors.errors.name as error}
                        <li class="text-danger">
                            <small>
                                {error}
                            </small>
                        </li>
                    {/each}
                {/if}
            </div>
            <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label">Text</label>
                {#if isLoading}
                    <Skeleton />
                {:else}
                    <textarea bind:value={post.text} type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" />
                {/if}
                {#if $errors?.errors?.text}
                    {#each $errors.errors.text as error}
                        <li class="text-danger">
                            <small>
                                {error}
                            </small>
                        </li>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
    <div class="card-footer">
        <Button on:click={update} {isDisabled} type="info" text="Save" isLoading={isLoadingButton} />
    </div>
</div>
<!-- 
<div>
    {#if post.id}
        <h1>{postId}</h1>
        <h1>{post.name}</h1>
        <p>{post.text}</p>
    {/if}
</div> -->
