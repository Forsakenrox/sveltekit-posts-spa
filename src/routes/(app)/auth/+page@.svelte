<script>
    import { errorsStore } from "$lib/stores/errorsStore";
    import { authStore } from "$lib/stores/authStore";
    import { goto } from "$app/navigation";
    import Button from "$lib/components/button.svelte";
    import { Http } from "$lib/http";

    let tab = "login";
    let isLoadingButton = false;
    let name = "";
    let password = "";

    async function login() {
        isLoadingButton = true;
        const config = {
            url: "http://127.0.0.1:8000/api/auth/login",
            method: "POST",
            data: { email: name, password: password },
        };
        const response = await Http.request(config);
        if (response?.token) {
            $authStore.token = response.token;
            goto("/");
        }
        isLoadingButton = false;
    }

    async function register() {
        isLoadingButton = true;
        console.log(123);
        const config = {
            url: "http://127.0.0.1:8000/api/auth/register",
            method: "POST",
            data: { email: name, password: password },
        };
        const response = await Http.request(config);
        if (response?.token) {
            $authStore.token = response.token;
            goto("/");
            console.log(321312);
        }
        isLoadingButton = false;
    }
</script>

<body class="login-page" style="min-height: 496.781px;">
    <div class="login-box">
        <div class="login-logo">
            <a href="#"><b>Admin</b>LTE</a>
        </div>
        <div class="card">
            <div class="card-body login-card-body">
                <p class="login-box-msg">Sign in to start your session</p>
                <div>
                    <div class="input-group mb-3">
                        <input bind:value={name} type="email" class="form-control" placeholder="Email" />
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope" />
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input bind:value={password} type="password" class="form-control" placeholder="Password" />
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock" />
                            </div>
                        </div>
                    </div>
                    {#if $errorsStore?.errors?.email}
                        {#each $errorsStore.errors.email as error}
                            <li class="text-danger">
                                <small>
                                    {error}
                                </small>
                            </li>
                        {/each}
                    {/if}
                    {#if $errorsStore?.errors?.password}
                        {#each $errorsStore.errors.password as error}
                            <li class="text-danger">
                                <small>
                                    {error}
                                </small>
                            </li>
                        {/each}
                    {/if}
                    <div class="row">
                        <div class="col-8">
                            <div class="icheck-primary">
                                <input type="checkbox" id="remember" />
                                <label for="remember"> Remember Me </label>
                            </div>
                        </div>

                        <div class="col-4">
                            {#if tab == "login"}
                                <Button on:click={login} type="primary" text="Login" isLoading={isLoadingButton} />
                            {:else}
                                <Button on:click={register} type="primary" text="Register" isLoading={isLoadingButton} />
                            {/if}
                        </div>
                    </div>
                </div>

                <!-- <p class="mb-1">
                    <a href="forgot-password.html">I forgot my password</a>
                </p> -->
                <p class="mb-0">
                    {#if tab == "login"}
                        <Button on:click={() => (tab = "register")} type="link" text="Register tab" />
                    {:else}
                        <Button on:click={() => (tab = "login")} type="link" text="Login tab" />
                    {/if}
                </p>
            </div>
        </div>
    </div>
</body>
