import gql from 'graphql-tag'
import graphqlClient from '../main'

export default {
  async actualizePokemons({ commit }, firstPokemons) {
    const response = await graphqlClient.query({
      // Grapphql query
      query: gql`
        query pokemons($first: Int!) {
          pokemons(first: $first) {
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
        }
      `,
      variables: { first: firstPokemons },
    })
    const newPokemonArray = response.data.pokemons.map((pokemon, index) => {
      return {
        name: pokemon.name,
        order: index + 1,
        fixed: false,
        info: pokemon,
      }
    })
    commit('setPokemons', newPokemonArray)
  },
}
