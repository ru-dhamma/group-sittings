import {writable} from 'svelte/store';

/** @typedef {import('svelte/store').Writable} Writable */
/** @typedef {import('../types')} Data */

/** @type {Writable<Data.Country.code|undefined>} */
export const country = writable(undefined);
/** @type {Writable<Data.City|undefined>} */
export const city = writable(undefined);
/** @type {Writable<boolean>} */
export const isIndex = writable(true);
