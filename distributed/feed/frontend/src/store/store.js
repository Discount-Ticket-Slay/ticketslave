// store.js
import { writable } from 'svelte/store';

export const userId = writable(null);  // Initialize with a default value