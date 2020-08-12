import axios from 'axios';

const URL_API = 'https://pokeapi.co/api/v2';

const getPokemon = async (pokemon) => {
  const req = await axios.get(`${URL_API}/pokemon/${pokemon}`);
  const data = req.data;
  console.log(data);
  return data;
}

const getPokemonForm = async (pokemon) => {
  const req = await axios.get(`${URL_API}/pokemon-form/${pokemon}`);
  const data = req.data;
  return data;
}

export default {
  getPokemon,
  getPokemonForm,
};
