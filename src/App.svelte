<script>
	import api from './api/api.js'
	import Card from './components/Card.svelte'

	let pokelist = [];
	let pokeResult;

let searchBox = {
	searchPokeName:'',
	inputValue: function() {
		const inputValue = searchBox.searchPokeName;
		return inputValue;
	},
	inputIsEmpty : function() {
		return searchBox.inputValue() === 0;
	},
	searchPokemon : async function() {
			if (!searchBox.inputIsEmpty()) {
			pokeResult =   api.getPokemon(searchBox.searchPokeName.toLowerCase());

			}
	},
	onKeyDown: function(e) {
		if (e.key === "Enter") {
			searchBox.searchPokemon();
		}
	}
}


</script>

<div id="container">
	<div class="header-box">
			<h1>Procurando algum <br/> pokemon?</h1>
			<div class="search-box">
				<img src="images/icons/search.png" alt="Lupa" on:click={searchBox.searchPokemon} >
				<input type="text" placeholder="Pesquise algum pokemon"
				on:keydown={searchBox.onKeyDown}
				bind:value={searchBox.searchPokeName}

				>
		</div>
	</div>
	<main>
		<!-- TODO: Change await block -->
		{#if pokeResult }
		{#await pokeResult then pokeData}
		<Card poke={pokeData} />
		{/await}
		{/if}
	</main>
</div>

<style>
	#container {
		height: 100vh;
		width: 86vw;
		max-width: 900px;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items:center;
	}

	.header-box {
		width: 100%;
		display:flex;
		flex-direction: column;
		margin-bottom: 3rem;
	}
	.header-box .center-box {
		width: 100%;
	}
	.header-box h1 {
		margin-top: 2rem;
		margin-bottom: 2rem;

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
