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
  getStats: (_pokemon) => {
    let stats = {};
    _pokemon.stats.map((item)=>{
      stats[item.stat.name] = {'base_stat': item.base_stat}
    });
    return stats;

  },
}

export default {
  formatPokeData,
}
