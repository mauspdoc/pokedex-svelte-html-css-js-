<style media="screen">
  .card {
    display: flex;
    position: relative;
    flex-diretion: row;
    align-items: center;
    height: 6.56rem;
    padding-left: 1rem;
    border-radius: .5rem;
    z-index: 0;
    max-width: 300px;
    margin: 0 auto;
  }
  .card .card__info {
    display: flex;
    flex-direction: column;
  }
  .card__info .info-types {
    display: flex;
  }

  .card__info strong {
    text-transform: capitalize;
    color: white;
    font-size: 1.5rem;
  }
  .card__info small {
    color: black;
    font-size: .8rem;
  }
  .card .card__img img {
    height: 8.3rem;
    position: absolute;
    right: 0.3rem;
    top: -2.3rem;
    z-index: 2;
  }
  .card__info .info-types .type-box {
    text-transform: capitalize;
    color: white;
    border-radius: .3rem;
    padding:0.3rem;
    display: flex;
    align-items: center;
    justify-content:center;
    font-size: 0.8rem;
    margin-left: 0.2rem;
  }
  .type-box img {
    height: 1rem;
    margin-right:0.3rem;
  }
  .bg-pokeball img {
    position: absolute;
    right: 1rem;
    bottom: 0rem;
    z-index: 1;
    height: 6.56rem;
    opacity: 0.18;
  }
  @media (min-width: 700px) {
    .card {
      max-width:500px;
    }
  }
</style>

<script>
  import { createEventDispatcher } from 'svelte';
  import componentData from '../utils/componentData.js'

  export let poke;
  let { artWork, pokeId, types, pokeName } = componentData.getCardData(poke);

  const dispatch = createEventDispatcher();
  const updateMenuCardData = () => {
    dispatch('click', {
      pokeName
    })
  }

</script>

<div class="card bg-{types[0].name}" id="poke{pokeId}" on:click={updateMenuCardData} >
 <div class="card__info">
<small>#{pokeId}</small>
<strong>{pokeName}</strong>
<div class="info-types">
{#each types as type}
<div class="{type.name} type-box">
  <img src="images/types/{type.name}.png" alt="Miniatura do tipo {type.name}"> {type.name}
</div>
{/each}
</div>
 </div>
 <div class="card__img">
   <img src={artWork} alt={"imagem do" + poke.name}/>
 </div>
 <div class="bg-pokeball">
   <img src="images/pokeball.png" alt="Imagem da pokeball">
 </div>
</div>
