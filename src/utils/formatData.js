const formatPokeData = {
   getTypes: (_pokemon) => {
    return _pokemon.types.map((value)=> value.type);
  },
   getArtWork: (_pokemon) => {
    return _pokemon.sprites.other["official-artwork"].front_default;
  },
   getId: (_pokemon) => {
    return _pokemon.id;
  },
   getPokeName: (_pokemon) => {
    return _pokemon.name
  },
}

export default {
  formatPokeData,
}
