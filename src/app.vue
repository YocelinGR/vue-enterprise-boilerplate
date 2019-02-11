<template>
  <div id="app">
    <PokemonsList :pokemons="pokemons"/>
  </div>
</template>

<script>
import PokemonsList from './components/PokemonsList'
import gql from 'graphql-tag';

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
  }
}`;

export default {
  name: 'App',
  components: {
    PokemonsList,
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
          first: 10
        }
      },
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
