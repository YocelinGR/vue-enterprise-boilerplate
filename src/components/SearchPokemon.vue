<template>
<div>
  <input v-model="whatPokemon" type="text" placeholder="Busca un pokemon">
  <p>{{pokemon.number}}</p>
</div>
</template>

<script>
import gql from 'graphql-tag';

// Grapphql query
const getPokemon =gql`
  query pokemon($name: String!){
  pokemon(name: $name){
    id
    name
    number
  }
}`;

// Component definition
export default {
  data: () => ({
    pokemon: {},
    whatPokemon: '',

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
