<script>
    import { errorsStore } from "$lib/stores/errorsStore";
    import { profileStore } from "$lib/stores/profileStore";

    $: console.log("errorsStore", $errorsStore);
    $: console.log("profileStore", $profileStore);
</script>

<slot><!-- optional fallback --></slot>
