<script>
    import { errorsStore } from "$lib/stores/errorsStore";

    $: console.log($errorsStore);
</script>

<slot><!-- optional fallback --></slot>
