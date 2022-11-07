<script>
    export let text = "BUTTON";
    export let isDisabled = false;
    export let isLoading = false;
    export let type = "primary";
    export let tag = "button";
    export let href = undefined;
</script>

<svelte:element on:click this={tag} {href} class="btn btn-sm btn-{type}" disabled={isDisabled || isLoading}>
    {#if isLoading}
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
    {:else}
        {text}
    {/if}
</svelte:element>
