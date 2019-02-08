<template>
  <div id="app">
    <DomiData />
  </div>
</template>

<script>
import DomiData from './components/domiData'

export default {
  name: 'App',
  components: {
    DomiData,
  },
}
</script>

<style>
#app {
  padding-bottom: 60px;
  margin-top: 60px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
