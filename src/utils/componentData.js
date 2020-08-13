import formatData from './formatData'
import api from '../api/api.js'

const getCardData = async (pokemon) => {
  const rawData = await api.getPokemon(pokemon);
  const types = formatData.formatPokeData.getTypes(rawData);
  const artWork = formatData.formatPokeData.getArtWork(rawData);
  const pokeId = formatData.formatPokeData.getId(rawData);
  const pokeName = formatData.formatPokeData.getPokeName(rawData);
  
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
