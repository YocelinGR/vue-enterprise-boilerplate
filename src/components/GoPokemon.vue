<template>
  <button>
    <span>{{ pokemon.name }}</span>
    <span>   {{ pokemon.number }}</span>
    <p>Ataques</p>
    <ul>
      <li v-for="attack in pokemon.attacks.special" :key="attack.name">
        <p>{{ attack.name }}</p>
      </li>
    </ul>

  </button>
</template>

<script>
export default {
  props: {
    pokemon: {
      type: Object,
      default: {}
    },
  }
}
</script>
