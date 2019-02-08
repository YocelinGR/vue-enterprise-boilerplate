import { gql } from 'apollo-boost'

export default gql`
  query allProducts($count: Int) {
    allProducts(count: $count) {
      id
      name
      price
    }
  }
`
