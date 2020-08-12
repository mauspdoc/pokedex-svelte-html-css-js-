const formatPokeData = (pokemon) => {
  const getTypes = (_pokemon) => {
    return _pokemon.types.map((value)=> value.type);
  }
  const getArtWork = (_pokemon) => {
    return _pokemon.sprites.other["official-artwork"].front_default;
  }
  const getId = (_pokemon) => {
    return _pokemon.id;
  }

  const getPokeName = (_pokemon) => {
    return _pokemon.name
  }
  
  const types = getTypes(pokemon);
  const artWork = getArtWork(pokemon);
  const pokeId = getId(pokemon);
  const pokeName = getPokeName(pokemon);
  return {
    types,
    artWork,
    pokeId,
    pokeName,
  };
}

export default {
  formatPokeData,
}
