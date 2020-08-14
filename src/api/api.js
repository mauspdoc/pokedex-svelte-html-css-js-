import axios from 'axios';

const URL_API = 'https://pokeapi.co/api/v2/';
const getFromAPI = async (resource) => {
  return await axios.get(`${URL_API}${resource}`)
}

const getPokemon = async (pokemon) => {
  const req = await getFromAPI(`pokemon/${pokemon.toLowerCase()}`);
  const data = req.data;
  return data;
}

const getPokemonForm = async (pokemon) => {
  const req = await getFromAPI(`pokemon-form/${pokemon}`);
  const data = req.data;
  return data;
}

const getPokemonsList = async (limit,offset) => {
  const req = await getFromAPI(`pokemon?limit=${limit}&offset=${offset}`);
  const data = req.data;
  console.log(data);
  return data;
}

export default {
  getPokemon,
  getPokemonForm,
  getPokemonsList,
};
