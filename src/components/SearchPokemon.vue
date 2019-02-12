<template>
<div class ="search-div row">
  <div class="col-md-6">
    <p>Name or number</p>
    <input v-model="whatPokemon" type="text" placeholder="Search pokemon">
    <span class="go-search"><i class="fas fa-search"></i></span>
    <p>Use the Advanced Search to explore Pokémon by type name!</p>
  </div>
  <div v-if="pokemon" class="col-md-6">
    <GoPokemon :pokemon="pokemon"></GoPokemon>
  </div>
</div>
</template>

<script>
import gql from 'graphql-tag';
import GoPokemon from './GoPokemon';

// Grapphql query
const getPokemon =gql`
  query pokemon($name: String!){
  pokemon(name: $name){
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

// Component definition
export default {
  components: {
    GoPokemon,
  },
  data: () => ({
    pokemon: {},
    whatPokemon: 'Charizard',

  }),
  // Apollo GraphQL
  apollo: {
    pokemon: {
      query: getPokemon,
      variables(){
        return {
          name: this.whatPokemon,
        }
      },
    },
  }
}
</script>
<style>
  .go-search {
    background-color: #d8641c;
    padding: 0.7em;
    border-radius: 2px;
  }
  input {
    height: 2.4rem;
    border-radius: 2px;
    padding: 4px;
  }
  p {
    padding: 0.2rem;
    margin: 0px;
  }
  .search-div {
    text-align: left;
    padding-left: 1.5rem;
  }
</style>
