export const UPDATED = false;

const baseURL = "https://pokeapi.co/api/v2";
const urlFilter = "pokemon?limit=151&offset=0";
const local = "http://localhost:9000"

class HttpService {
  fetchAllPokemon() {
    const results = [];
    return fetch(`${baseURL}/${urlFilter}`)
      .then((response) => response.json())
      .then((allPokemon) => {
        allPokemon.results.map((pokemon) => results.push(pokemon));
      })
      .then(() => results)
      .catch((err) => console.log({
        message: "fetchAllPokemon: error fetching all Pokemon",
        err
      }))
  }

  fetchPokemonData(pokemon) {
    let url = pokemon.url;
    let obj = {}
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const hasStat1 =  Boolean(data.stats[1]);
        const hasAb = Boolean(data.abilities[0]);
        const hasHiddenAb = Boolean(data.abilities[1]);
        const hasAttack = Boolean(data.moves[0]);
          obj = {
            id: data.id,
            name: data.name,
            type: data.types[0].type.name,
            hp: data.stats[0].base_stat,
            damage: hasStat1 && data.stats[1].base_stat,
            attack: hasAttack && data.moves[0].move.name,
            ability: hasAb && data.abilities[0].ability.name,
            hidden_ability: hasHiddenAb && data.abilities[1].ability.name,
            img: data.sprites.other["official-artwork"].front_default,
          };
        return fetch(data.moves[0].move.url)
          .then((res) => res.json())
          .then((data) => {
            obj.desc = data.effect_entries[0].short_effect;
          })
      })
      .then(() =>  obj)
      .catch((err) => console.log({
        message: "fetchPokemonData: error fetching Pokemon data",
        err
      }))
  }
  async postItem(item) {
    const pokemon = await this.fetchPokemonData(item);
    return fetch(local, {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body:JSON.stringify(pokemon)
    })
    .then(res => res.json()).then((data) => {
      if (data) console.log({ message: `New item added:`, data });
    })
  }

  getCardList() {
    return fetch(local)
      .then((response) => response.json())
      .catch((err) => console.log({
        message: "getCardList: error fetching getCardList",
        err
      }))
  }
}


export default HttpService;
