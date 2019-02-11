<template>
<div>
  <p>Name or number</p>
  <input v-model="whatPokemon" type="text" placeholder="Search pokemon">
  <span><i class="fas fa-search"></i></span>
  <p>Use the Advanced Search to explore Pokémon by type name!</p>
  <div v-if="pokemon">
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
