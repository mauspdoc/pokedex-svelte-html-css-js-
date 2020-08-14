<style>

	#container {
		height: 100vh;
		width: 86vw;
		max-width: 900px;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items:center;
		min-height: 20rem;
	}

	.header-box {
		border: none;
		border-radius: 0 0 1.5rem 1.5rem;
		width: 100%;
		padding: 2rem 1rem;
		max-width: 900px;
		display:flex;
		flex-direction: column;
		margin-bottom: 3rem;
	}
	.header-box .center-box {
		width: 100%;
	}
	.header-box h1 {
		margin-bottom: 2rem;
		color: white;
		font-weight: 500;

	}
	.header-box .search-box {
		width: 100%;
		position: relative;
	}
	.header-box .search-box img {
		height: .9rem;
		position: absolute;
		top: 1rem;
		left: 1.5rem;
		cursor: pointer;
	}
	.header-box .search-box input {
		background: #E3E3E3;
		padding-left: 2.8rem;
		padding-top: 1rem;
		padding-bottom: 1rem;
		padding-right: 1rem;
		width: 100%;
		height: 3rem;
		border: none;
		border-radius: .3rem;
		text-align: center;
		font-size: 1rem;
		font-weight: 300;
	}

	main {
		width: 100%;
	}

	@media (min-width: 700px) {
		.header-box {
			width: 80%;
		}
		.header-box .search-box input {
			font-size: 2rem;
		}
		.header-box .search-box img {
			height: 1.3rem;
		}
	}
</style>

<script>
	import api from './api/api.js';
	import Card from './components/Card.svelte';
	import ListPokemons from './components/ListPokemons.svelte';
	import MenuCard from './components/MenuCard.svelte';
	import componentData from './utils/componentData';
	import { fade } from 'svelte/transition';
	import { visibility } from './stores.js';

	let pokelist = [];
	let pokeResult;

	let pokeMenu = {
		pokeName: '',
		showUpMenuCard: async (ev) => {
			// pokeMenu.pokeName = ev.detail.forPokemon;
			visibility.update((prevState) => { return {...prevState, vMenuCard: true} } )
		},
	};


	let searchBox = {
		searchPokeName: 'Charizard',
		inputValue: 'Charizard',
		inputIsEmpty: function() {
			return searchBox.inputValue.length === 0;
		},
		searchPokemon: async function() {
			if (!searchBox.inputIsEmpty()) {
					searchBox.searchPokeName = searchBox.inputValue;

			}
		},
		onKeyDown: function(e) {
			if (e.key === "Enter") {
				searchBox.searchPokemon();
			}
		},
	}


	// First pokemon to appear when load
	window.addEventListener('load', () => {
		searchBox.searchPokemon();
	})


</script>
<div class="header-box bg-fire">
	<h1>Procurando algum <br /> pokemon?</h1>
	<div class="search-box">
		<img src="images/icons/search.png" alt="Lupa" on:click={searchBox.searchPokemon}>
		<input type="text" placeholder="Pesquise algum pokemon" on:keydown={searchBox.onKeyDown} bind:value={searchBox.inputValue} >
	</div>
</div>
<div id="container">
	<main>

		<Card bind:forPokemon={searchBox.searchPokeName}  />
		<ListPokemons />
	</main>

</div>
{#if $visibility.vMenuCard}
<MenuCard pokeName={pokeMenu.pokeName} />
{/if}
