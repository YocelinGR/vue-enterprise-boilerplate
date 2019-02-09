<template>
  <div id="app">
    <PokemonsList />
  </div>
</template>

<script>
import PokemonsList from './components/PokemonsList'

export default {
  name: 'App',
  components: {
    PokemonsList,
  },
}
</script>

<style>
#app {
  padding-bottom: 60px;
  margin-top: 60px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #c7230e;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
    background: #4b5279;
}
</style>
