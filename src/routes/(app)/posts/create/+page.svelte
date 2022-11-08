<script>
    import { errors } from "$lib/stores/errors";
    import { post as Post } from "$lib/models/post";
    import { goto } from "$app/navigation";
    import Button from "$lib/components/button.svelte";
    let post = {};
    let isLoadingButton = false;

    async function create() {
        isLoadingButton = true;
        let result = await Post.create(post);
        isLoadingButton = false;
        if (!$errors?.errors) {
            goto("/posts/");
        }
    }
</script>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">New post</h3>
    </div>
    <div class="card-body">
        <div class="bd-example">
            <div class="mb-3">
                <label for="formGroupExampleInput" class="form-label">Name</label>
                <input bind:value={post.name} type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder" />
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
                <textarea bind:value={post.text} type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" />
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
        <Button on:click={create} type="info" text="Save" isLoading={isLoadingButton} />
    </div>
</div>
