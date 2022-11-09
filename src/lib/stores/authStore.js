// import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { writable } from 'svelte-local-storage-store'

function create() {
    const { subscribe, set, update } = writable('auth', { token: null });

    return {
        subscribe,
        set,
        update,
        logout: function () {
            set({ token: null });
            goto('/auth');
        },
        reset: () => set({ token: null })
    };
}

export const authStore = create();