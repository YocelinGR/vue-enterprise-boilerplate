import Vue from 'vue'
import App from './app'
import router from '@router'
import store from '@state/store'
import '@components/_globals'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (window.Cypress) {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: "https://fakerql.com/graphql'",
  }),
})

Vue.use(VueApollo)

const app = new Vue({
  router,
  store,
  provide: apolloProvider.provide(),
  render: (h) => h(App),
}).$mount('#app')

// If running inside Cypress...
if (window.Cypress) {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}
