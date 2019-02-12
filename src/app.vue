<template>
  <div id="app">
    <PokemonsList/>
  </div>
</template>

<script>
import PokemonsList from './components/PokemonsList'

export default {
  name: 'App',
  components: {
    PokemonsList,
  },
  data: () => ({
  })
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
