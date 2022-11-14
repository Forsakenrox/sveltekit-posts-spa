// import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { writable } from 'svelte-local-storage-store'
import { profileStore } from './profileStore';
function create() {
    const { subscribe, set, update } = writable('auth', { token: null });

    return {
        subscribe,
        set,
        update,
        logout: function () {
            profileStore.set({});
            set({ token: null });
            goto('/auth');
        },
        reset: () => set({ token: null })
    };
}

export const authStore = create();