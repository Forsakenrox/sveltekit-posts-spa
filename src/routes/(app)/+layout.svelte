<script>
    import { page } from "$app/stores";
    import { postsStore } from "$lib/stores/postsStore";
    import { authStore } from "$lib/stores/authStore";
    import { profileStore } from "$lib/stores/profileStore";
    import { errorsStore } from "$lib/stores/errorsStore";
    import axios from "axios";
    if (!$profileStore?.id) {
        console.log(123);
        axios.get("http://127.0.0.1:8000/api/profile", { headers: { Authorization: "Bearer " + $authStore.token } }).then((response) => ($profileStore = response.data));
    }
</script>

<body class="control-sidebar-slide-open" style="height: auto;">
    <div class="wrapper">
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <div class="sidebar" style="overflow-y: auto;">
                <div class="form-inline">
                    <div class="input-group" data-widget="sidebar-search">
                        <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                        <div class="input-group-append">
                            <button class="btn btn-sidebar"><i class="fas fa-search fa-fw" /></button>
                        </div>
                    </div>
                </div>
                <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li class="nav-header">EXAMPLES</li>
                        <li class="nav-item">
                            <a href="/" class="nav-link {$page.url.pathname == '/' ? 'active' : ''}"
                                ><i class="nav-icon far fa-calendar-alt" />
                                <p>Home</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/posts" class="nav-link {$page.url.pathname.startsWith('/posts') ? 'active' : ''}"
                                ><i class="nav-icon far fa-image" />
                                <p>Posts<span class="badge badge-info right">{$postsStore.count}</span></p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
        <div class="content-wrapper" style="min-height: 1302.12px;">
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1>Simple Tables</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item">
                                    <a href="/">Home</a>
                                </li>
                                <li class="breadcrumb-item active">Simple Tables</li>
                            </ol>
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item">
                                    {$profileStore.name}
                                    <button class="btn btn-sm btn-link" on:click={authStore.logout}>Logout</button>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section class="content-header">
                <section class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                {#if $errorsStore?.message}
                                    <div class="alert alert-danger" role="alert">{$errorsStore.message}</div>
                                {/if}
                                <slot><!-- optional fallback --></slot>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
        <footer class="main-footer">
            <div class="float-right d-none d-sm-block">
                <b>Version</b> 3.2.0
            </div>
            <strong>Copyright ?? 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> All rights reserved.
        </footer>
        <div id="sidebar-overlay" />
    </div>
</body>
