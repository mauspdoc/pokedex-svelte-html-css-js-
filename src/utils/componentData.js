import formatData from './formatData'
import api from '../api/api.js'

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

const getMenuCardData = async (pokemon) => {
  const rawData = await api.getPokemon(pokemon);
  const types = formatData.formatPokeData.getTypes(rawData);
  const pokeId = formatData.formatPokeData.getId(rawData);
  const pokeStats =  formatData.formatPokeData.getStats(rawData);
  const artWork = formatData.formatPokeData.getArtWork(rawData);
  return {
    types,
    pokeId,
    pokeStats,
    artWork,
  }
}

export default {
  getCardData,
  getMenuCardData,
}
