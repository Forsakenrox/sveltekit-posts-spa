import { writable } from 'svelte/store';

function create() {
    const { subscribe, set, update } = writable({ count: 0 });

    return {
        subscribe,
        set,
        update,
        increase: () => update((n) => n + 1),
        decrease: () => update((n) => n + 1),
        reset: () => set({})
    };
}

export const postsStore = create();