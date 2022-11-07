import { writable } from 'svelte/store';

// export const errors = Аwritable({});


function create() {
    const { subscribe, set, update } = writable({});

    return {
        subscribe,
        set,
        update,
        reset: () => set({})
    };
}

export const errors = create();