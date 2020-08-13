<script>
	import api from './api/api.js';
	import Card from './components/Card.svelte';
	import componentData from './utils/componentData';

	let pokelist = [];
	let pokeResult;

	let pokeMenu = {
		pokeName: '',
		pokeData: '',
		updateData: async (ev) => {
			pokeMenu.pokeName = ev.detail.pokeName;
			pokeMenu.pokeData = await componentData.getMenuCardData(pokeMenu.pokeName);
		},
	};

	let searchBox = {
		searchPokeName: '',
		inputValue: function() {
			const inputValue = searchBox.searchPokeName;
			return inputValue.trim().toLowerCase();
		},
		inputIsEmpty: function() {
			return searchBox.inputValue() === 0;
		},
		searchPokemon: async function() {
			if (!searchBox.inputIsEmpty()) {
				pokeResult = false; // Make poke data reactive
				pokeResult = await api.getPokemon(searchBox.inputValue());

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

	// First pokemon to appear when load
	window.addEventListener('load', () => {
		searchBox.searchPokeName = "Charizard";
		searchBox.searchPokemon();
	})


</script>

<div id="container">
	<div class="header-box">
		<h1>Procurando algum <br /> pokemon?</h1>
		<div class="search-box">
			<img src="images/icons/search.png" alt="Lupa" on:click={searchBox.searchPokemon}>
			<input type="text" placeholder="Pesquise algum pokemon" on:keydown={searchBox.onKeyDown} bind:value={searchBox.searchPokeName} on:change={searchBox.onChange}>
		</div>
	</div>
	<main>
		{#if pokeResult }
		<Card poke={pokeResult} on:click={pokeMenu.updateData} />
		{/if}
	</main>

</div>
{#if pokeMenu.pokeData}
<div class="bg-blur" on:click={()=>{pokeMenu.pokeData = false}}></div>
<div class="menuCard bg-{pokeMenu.pokeData.types[0].name}">

	<div class="menuCard__info">
		<h2>{pokeMenu.pokeName}</h2>

		<div class="box-attribute">
			<p class="attribute-name">Id</p>
			<span class="attribute-values">
				#{pokeMenu.pokeData.pokeId}
		</span>
		</div>

		<div class="poke-attributes">
			<div class="box-attribute">
				<p class="attribute-name">Tipo</p>
				<span class="attribute-values">
				{#each pokeMenu.pokeData.types as type}
				<div class="type-box {type.name}">
					<img src="images/types/{type.name}.png" alt="Miniatura do tipo {type.name}">
					{type.name}
				</div>
				{/each}
			</span>
			</div>

			<div class="box-attribute">
				<p class="attribute-name">Ataque</p>
				<span class="attribute-values">
					{pokeMenu.pokeData.pokeStats.attack.base_stat}
			</span>
			</div>

			<div class="box-attribute">
				<p class="attribute-name">Defesa</p>
				<span class="attribute-values">
					{pokeMenu.pokeData.pokeStats.defense.base_stat}
			</span>
			</div>

		</div>
	</div>

	<div class="menuCard__img">
		<img src="{pokeMenu.pokeData.artWork}" alt="Imagem do pokemon">
	</div>
</div>
{/if}

<style>
	.bg-blur {
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.39);
	}
	.menuCard {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-around;
		height:17.5rem;
		width: 100%;
		max-width:700px;
		max-height: 250px;
		border-radius: 1rem 1rem 0 0;
		position: absolute;
		bottom: 0;
		padding: 2rem 1rem 1rem 2rem;
	}
	.menuCard__img img{
		width:200px;
		position: absolute;
		top: -145px;
		left: 50%;
		margin-left: -100px;

	}
	.menuCard__info {
		min-width: 70%;
		color: white;
	}
	.menuCard__info h2 {
		font-weight: 500;
		font-size: 1.2rem;
		text-transform: capitalize;
	}
	.menuCard__info .poke-attributes {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

 .attribute-values {
 	margin-left: 2rem;
 	display: flex;
	align-items: center;
 }
 .box-attribute {
 	display: flex;
	align-items: center;
	margin-top: 1rem;
	width: 100%;

 }
 .attribute-name {
 	/* Helps align items in the box */
 	width: 100px;
 }
 .poke-attributes .type-box {
 	padding: 0.3rem;
	display: flex;
  align-items: center;
 	margin-right: 0.3rem;
	border-radius: 0.3rem;
 }
 .poke-attributes .type-box img{
 	height: 1.1rem;
	margin-right: 0.3rem;
 }
@media (min-width:600px) {
	.menuCard__img img {
		position: initial;
	}
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
