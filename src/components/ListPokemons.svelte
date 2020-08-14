

<script>
  import throttle from 'lodash/throttle';
  import debounce from 'lodash/debounce'
  import api from '../api/api.js';
  import Card from './Card.svelte';

  let dataListPokemons = [];
  let lockUpdate = false;
  let offSet = 0;
  let limit = 7;

  const updateData = async () => {
    if (!lockUpdate) {
    lockUpdate = true;
    const data = await api.getPokemonsList(limit, offSet)
    const dataResults = data.results
    dataListPokemons = [...dataListPokemons,...dataResults];
    offSet += limit;
    lockUpdate = false;
  }

  }

updateData()

const canUpdateList = () => {
  const lastCard = document.querySelector(`.ListPokemons`)

  // absoluteValue dont change, just actualBottomPagePosition get update (because user can scroll)
  const actualBottomPagePosition = document.documentElement.getBoundingClientRect().height + window.pageYOffset;
  const absoluteTopElementPosition = lastCard.offsetTop; // Top position of the last card element
  const absoluteBottomElementPosition = absoluteTopElementPosition + lastCard.offsetHeight;
  const thrashValue = 700;
  const distance = absoluteBottomElementPosition - actualBottomPagePosition;
  if ( distance <= thrashValue && distance >= 0) {
    updateData()
  }
  if (distance < 0 && distance >= -thrashValue) {
    updateData()
  }
}

window.addEventListener('scroll', throttle( canUpdateList, 200))



</script>
<div class="ListPokemons">
{#if dataListPokemons}

{#each dataListPokemons as pokemonInList}
<Card forPokemon={pokemonInList.name} />
{/each}

{/if}
</div>
