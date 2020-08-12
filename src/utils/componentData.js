import formatData from './formatData'

const getCardData = (pokemon) => {
  const types = formatData.formatPokeData.getTypes(pokemon);
  const artWork = formatData.formatPokeData.getArtWork(pokemon);
  const pokeId = formatData.formatPokeData.getId(pokemon);
  const pokeName = formatData.formatPokeData.getPokeName(pokemon);
  return {
    types,
    artWork,
    pokeId,
    pokeName,
  };
}

export default {
  getCardData,
}
