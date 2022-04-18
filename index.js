import { gql } from 'apollo-server'
import { ApolloServer } from 'apollo-server'

const persons = [
  {
    name: 'Santiago 0',
    phone: '+3434223432432',
    street: 'Pradera arupos y nogales',
    city: 'Loja',
    id: '123232sadsa3s',
    age: 12,
  },
  {
    name: 'Santiago 1',
    phone: '+3434223432432',
    street: 'Pradera arupos y nogales',
    city: 'Loja',
    id: '12xxxx2sadsa3s',
    age: 16,
  },
  {
    name: 'Santiago 2',
    phone: '+3434223432432',
    street: 'Pradera arupos y nogales',
    city: 'Loja',
    id: '123232s221a3s',
    age: 22,
  },
  {
    name: 'Santiago 3',
    phone: '+3434223432432',
    street: 'Pradera arupos y nogales',
    city: 'Loja',
    id: '1111111',
    age: 11,
  },
]

const typeDefs = gql`
  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    age: Int!
    canDrink: Boolean!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons: [Person]!
    findPerson(name: String): Person!
  }
`

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) => {
      const { name } = args
      return persons.find((persons) => persons.name === name)
    },
  },
  Person: {
    canDrink: (root) => root.age > 18,
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      }
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
