<script>
    import { onMount } from "svelte";
    import { Skeleton } from "svelte-loading-skeleton";

    let isLoading = false;
    let posts = [];

    
    onMount(async () => {
        await getPosts();
    });
    
    async function getPosts() {
        isLoading = true;
        const response = await fetch("http://127.0.0.1:8000/api/posts");
        posts = await response.json();
        isLoading = false;
    }
    
    async function deletePost(id) {
        let postId = posts.findIndex((post) => post.id == id);
        posts[postId].isDeleting = true;
        const response = await fetch("http://127.0.0.1:8000/api/posts/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: id,
        });
        if (response.status == "200") {
            console.log("response prishel "+ posts.length);
            posts = posts.filter(post => post.isDeleting != true)
        } else {
            posts[postId].isDeleting = false;
        }
    }

    $: console.log(posts);

</script>

<svelte:head>
    <title>posts-show-lol</title>
</svelte:head>
<div class="card">
    <div class="card-header">
        <h3 class="card-title">List of posts</h3>
        <div class="card-tools">
            <div class="input-group input-group-sm" style="width: 150px;">
                <input type="text" name="table_search" class="form-control float-right" placeholder="Search" />
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
                    <th>ID</th>
                    <th>name</th>
                    <th>created</th>
                    <th>updated</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#if isLoading}
                    <tr>
                        <td>
                            <Skeleton />
                        </td>
                        <td>
                            <Skeleton />
                        </td>
                        <td>
                            <Skeleton />
                        </td>
                        <td>
                            <Skeleton />
                        </td>
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
                                {#if post?.isDeleting == true}
                                    <button on:click={deletePost(post.id)} class="btn btn-sm btn-danger" disabled>
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                    </button>
                                {:else}
                                    <button on:click={deletePost(post.id)} class="btn btn-sm btn-danger">X</button>
                                {/if}
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
    <div class="card-footer"><a href="/posts/create" class="btn btn-info">New post</a></div>
</div>
