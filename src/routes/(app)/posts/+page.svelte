<script>
    import { errorsStore } from "$lib/stores/errorsStore";
    import Post from "$lib/models/Post";
    import { onMount } from "svelte";
    import { Skeleton } from "svelte-loading-skeleton";
    import Button from "$lib/components/button.svelte";
    import { postsStore } from "$lib/stores/postsStore";

    // export let data;

    let isLoading = true;
    let posts = [];
    let fields = ["id", "name", "created_at", "updated_at"];
    let order = null;
    let searchString = "";

    onMount(async () => {
        await getPosts();
        console.log(posts);
    });

    async function getPosts() {
        isLoading = true;
        posts = await Post.when(searchString, function (q) {
            q.where("name", searchString);
            q.where("text", searchString);
        })
            .when(order, function (q) {
                q.orderBy(order);
            })
            .get();
        postsStore.set({ count: Object.keys(posts).length });
        isLoading = false;
    }

    async function deletePost(id) {
        let postId = posts.findIndex((post) => post.id == id);

        posts[postId].isDeleting = true;

        let post = new Post({ id: id });
        let result = await post.delete();

        if (!$errorsStore?.errors) {
            posts = posts.filter((post) => post.isDeleting != true);
        } else {
            posts[postId].isDeleting = false;
        }
    }
    async function changeOrder(field) {
        if (order == field && !order.startsWith("-")) {
            order = "-" + field;
        } else {
            order = field;
        }
        await getPosts();
    }
    $: console.log(searchString);
    $: searchString && getPosts();
    // $: searchString = sea;
    // $: async (order) => await getPosts(order);
</script>

<svelte:head>
    <title>posts-show-lol</title>
</svelte:head>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">List of posts</h3>
        <div class="card-tools">
            <div class="input-group input-group-sm" style="width: 150px;">
                <input bind:value={searchString} on:change={() => console.log(321)} type="text" name="table_search" class="form-control float-right" placeholder="Search" />
                <div class="input-group-append">
                    <button type="submit" class="btn btn-default"><i class="fas fa-search" /></button>
                </div>
            </div>
        </div>
    </div>
    <div class="card-body table-responsive p-0">
        <table class="table table-hover text-nowrap">
            <thead>
                <tr>
                    {#each fields as field}
                        <th on:click={() => changeOrder(field)}>
                            {field}{order == field ? "⇣" : ""}{order == "-" + field ? "⇡" : ""}
                        </th>
                    {/each}
                    <th> Actions </th>
                </tr>
            </thead>
            <tbody>
                {#if isLoading}
                    <tr>
                        {#each fields as field}
                            <td>
                                <Skeleton />
                            </td>
                        {/each}
                        <td>
                            <Skeleton />
                        </td>
                    </tr>
                {:else}
                    {#each posts as post}
                        <tr>
                            <td>{post.id}</td>
                            <td>{post.name}</td>
                            <td>{post.created_at}</td>
                            <td>{post.updated_at}</td>
                            <td>
                                <Button on:click={deletePost(post.id)} type="danger" text="X" isLoading={post?.isDeleting} />
                                <a href="/posts/{post.id}" class="btn btn-sm btn-info">OPEN</a>
                            </td>
                        </tr>
                        <!-- <li><a href="/posts/{post.id}">{post.name}</a></li><button on:click|preventDefault={deletePost(post.id)}>X</button> -->
                    {:else}
                        <div>List of Posts Is empty</div>
                    {/each}
                {/if}
            </tbody>
        </table>
    </div>
    <div class="card-footer">
        <a href="/posts/create" class="btn btn-info">New post</a>
    </div>
</div>
