<script>
    import { goto } from "$app/navigation";
    import axios from "axios";
    let post = {};
    let errors = {};
    let isLoading = false;

    // async function save() {
    //     isLoading = true;
    //     const response = await fetch("http://127.0.0.1:8000/api/posts", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(post),
    //     });

    //     if (response.status === 200) {
    //         post = {};
    //         // goto("/posts");
    //     } else if (response.status === 422) {
    //         errors = response.json();
    //         isLoading = false;
    //     }
    // }
    async function save() {
        isLoading = true;
        const response = await axios.post("http://127.0.0.1:8000/api/posts", post).then(
            (response) => response,
            (response) => response
        );

        console.log(response);
        if (response.status === 200) {
            post = {};
            isLoading = false;
            // goto("/posts");
        }
        if (response.status === 422) {
            errors = response.json();
            isLoading = false;
        }
        isLoading = false;
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
            </div>
            <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label">Text</label>
                <textarea bind:value={post.text} type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" />
            </div>
        </div>
    </div>
    <div class="card-footer">
        {#if isLoading}
            <button class="btn btn-primary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                Saving...
            </button>
        {:else}
            <button on:click={save} class="btn btn-primary">Save</button>
        {/if}
    </div>
</div>
