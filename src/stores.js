import { writable } from 'svelte/store';

// Controlls components visibility
export const visibility = writable({
  vMenuCard: false,
  vCardTop: false,
});

export const globalData = writable({
  pokeForSearch: 'Charizard',
  pokeForMenu: 'raichu',
})
