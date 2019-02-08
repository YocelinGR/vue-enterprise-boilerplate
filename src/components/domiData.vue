<template>
  <div>
    <h1>Holu</h1>
    <ApolloQuery :query="require('../queries/domiData.js').default">
      <p>Domi falsa</p>
      <template slot-scope="{ result: { loading, error, data } }">
        <ul v-if="data.allProducts.length">
          <li v-for="s in data.allProducts" :key="s.id">
            <span>{{ s.name }}</span>
            <span>{{ s.price }}</span>
          </li>
        </ul>
        <div v-else class="empty">
          No Speakers match your search
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
  name: 'DomiData',
  components: {},
  data() {
    return {}
  },
}
</script>
