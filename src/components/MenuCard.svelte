<script>
  import componentData from '../utils/componentData';
  import { fade } from 'svelte/transition';
  import { visibility } from '../stores.js';

  export let pokeName;
  let pokeMenu = {
    pokeName,
    pokeData: '',
    updateData: async () => {
      pokeMenu.pokeName = pokeName;
      pokeMenu.pokeData = await componentData.getMenuCardData(pokeMenu.pokeName);
    },
  };
pokeMenu.updateData(pokeName);

const closeWindow = () => { visibility.update((prevState) => { return {...prevState, vMenuCard: false} }) }

</script>


{#if pokeMenu.pokeData}
<div class="bg-blur" on:click={ closeWindow }></div>
<div class="menuCard bg-{pokeMenu.pokeData.types[0].name}" in:fade="{{duration:900}}">

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
</style>
