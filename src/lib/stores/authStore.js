import { writable } from 'svelte/store';

// export const errors = Аwritable({});


function create() {
    const { subscribe, set, update } = writable({ token: null });

    return {
        subscribe,
        set,
        update,
        reset: () => set({ token: null })
    };
}

export const authStore = create();