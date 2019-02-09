<template>
  <div class="continents-list">
    <h1>Poke Desk App</h1>
    <SearchPokemon></SearchPokemon>
    <ul>
      <li v-for="pokemon in pokemons" :key="pokemon.id">
        <GoPokemon :pokemon="pokemon">Ver pokemon</GoPokemon>
        <br>
      </li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import GoPokemon from './GoPokemon';
import SearchPokemon from './SearchPokemon';

// Grapphql query
const getPokemons =gql`
  query pokemons($first: Int!){
  pokemons(first: $first){
    id
    name
    number
    attacks {
      special {
        name
        type
        damage
      }
    }
    evolutions {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      attacks {
        fast {
          name
          type
          damage
        }
      }
    }
  }
}`;

// Component definition
export default {
  components: {
    GoPokemon,
     SearchPokemon,
  },
  data: () => ({
    pokemons: [],
  }),
  // Apollo GraphQL
  apollo: {
    pokemons: {
      query: getPokemons,
      variables(){
        return {
          first: 2
        }
      },
    },
  }
}
</script>

<style>
  ul li {
    list-style-type: none;
    }
</style>
