import { writable } from 'svelte/store';

function create() {
    const { subscribe, set, update } = writable({});

    return {
        subscribe,
        set,
        update,
        reset: () => set({})
    };
}

export const profileStore = create();