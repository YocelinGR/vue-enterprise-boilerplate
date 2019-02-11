<template>
  <button>
    <p>Name: {{ pokemon.name }}</p>
    <p>Number: {{ pokemon.number }}</p>
    <!-- <p>Attacks: </p>
    <ul>
      <li v-for="attack in pokemon.attacks.special" :key="attack.name">
        <p>{{attack.name }}</p>
      </li>
    </ul> -->
  </button>
</template>

<script>
export default {
  props: {
    pokemon: {
      type: Object,
    },
  }
}
</script>
