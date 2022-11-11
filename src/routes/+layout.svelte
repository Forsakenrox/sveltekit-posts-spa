<script>
    import { errorsStore } from "$lib/stores/errorsStore";

    $: console.log("errorsStore", $errorsStore);
</script>

<slot><!-- optional fallback --></slot>
