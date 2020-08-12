<script>

	import api from './api/api.js';
	import Card from './components/Card.svelte';
	import componentData from './utils/componentData';

	let pokelist = [];
	let pokeResult;

let pokeMenu = {
	pokeName: '',
	pokeData: '',
	searchPokemon: async () => {
		pokeMenu.pokeData = await api.getPokemon(pokeMenu.pokeName);
	},
	updateData: async (ev)=> {
		pokeMenu.pokeName = ev.detail.pokeName;
		await pokeMenu.searchPokemon();
		console.log(pokeMenu.pokeData);
	},
};

let searchBox = {
	searchPokeName:'',
	inputValue: function() {
		const inputValue = searchBox.searchPokeName;
		return inputValue.trim().toLowerCase();
	},
	inputIsEmpty : function() {
		return searchBox.inputValue() === 0;
	},
	searchPokemon : async function() {
			if (!searchBox.inputIsEmpty()) {
			pokeResult = false; // Make poke data reactive
			pokeResult =  await api.getPokemon(searchBox.inputValue());

			}
	},
	onKeyDown: function(e) {
		if (e.key === "Enter") {
			searchBox.searchPokemon();
		}
	},
	onChange: function(e) {

	}
}

// Random pokemon for first load

window.addEventListener('load',()=>{
	searchBox.searchPokeName = "Charizard";
	searchBox.searchPokemon();
})

</script>

<div id="container">
	<div class="header-box">
			<h1>Procurando algum <br/> pokemon?</h1>
			<div class="search-box">
				<img src="images/icons/search.png" alt="Lupa" on:click={searchBox.searchPokemon} >
				<input type="text" placeholder="Pesquise algum pokemon"
				on:keydown={searchBox.onKeyDown}
				bind:value={searchBox.searchPokeName}
				on:change={searchBox.onChange}

				>
		</div>
	</div>
	<main>
		{#if pokeResult }
		<Card poke={pokeResult} on:click={pokeMenu.updateData} />
		{/if}
	</main>

	<div class="menuCard">
		<div class="menuCard__info">
			<h2>{pokeMenu.pokeName}</h2>
			<div class="info__attribute">
				<div class="poke-attribute">
					<p class="attribute-name">Type</p>
					<p class="attribute-value">Fire</p>
				</div>
			</div>
		</div>
	</div>

</div>

<style>
	.menuCard {
		height:17.5rem;
		width: 100%;
		max-width:700px;
		background: red;
		border-radius: 1rem 1rem 0 0;
		position: absolute;
		bottom: 0;
		padding: 2rem 1rem 1rem 2rem;
	}
	.menuCard__info {
		width: 50%;
		max-width: 12.5rem;
		color: white;
	}
	.menuCard__info h2 {
		font-weight: 500;
		margin-bottom: 1rem;
		font-size: 1.2rem;
		text-transform: capitalize;
	}
	.menuCard__info .poke-attribute {
		display: flex;
		justify-content: space-between;
	}


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
