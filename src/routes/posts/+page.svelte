<script>
    import { onMount } from "svelte";

    let isLoading = false;
    let posts = [];
    let newPost = {};
    
    $: console.log(newPost)

    onMount(async () => {
        await getPosts();
    });

    async function getPosts() {
        isLoading = true;
        const response = await fetch("http://127.0.0.1:8000/api/posts");
        posts = await response.json();
        isLoading = false;
        console.log(posts);
    }

    async function createPost() {
        const response = await fetch("http://127.0.0.1:8000/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
        });
        if (response.status == "200") {
            await getPosts();
            newPost = {};
        }
    }

    async function deletePost(id) {
        isLoading = true;
        const response = await fetch("http://127.0.0.1:8000/api/posts/"+id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: id,
        });
        if (response.status == "200") {
            await getPosts();
        }
    }

</script>
<svelte:head>
    <title>posts-show-lol</title>
</svelte:head>
<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            list of posts
                        </h3>
                        <div class="card-tools">
                            <div
                                class="input-group input-group-sm"
                                style="width: 150px;">
                                <input
                                    type="text"
                                    name="table_search"
                                    class="form-control float-right"
                                    placeholder="Search" />
                                <div class="input-group-append">
                                    <button
                                        type="submit"
                                        class="btn btn-default"><i
                                            class="fas fa-search" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body table-responsive p-0">
                        <table
                            class="table table-hover text-nowrap">
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
                                    <div>loading...</div>
                                {:else}
                                    {#each posts as post}
                                    <tr>
                                        <td>{post.id}</td>
                                        <td>{post.name}</td>
                                        <td>{post.created_at}</td>
                                        <td>{post.updated_at}</td>
                                        <td> 
                                            <span on:click={deletePost(post.id)} class="btn btn-sm btn-danger">X</span>
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
                </div>
            </div>
        </div>
    </div>
</section>

<div>
    <br />
    name <input bind:value={newPost.name} type="text" /><br />
    text <input bind:value={newPost.text} type="text" /><br />
    <button on:click={createPost}>New post</button>
</div>
