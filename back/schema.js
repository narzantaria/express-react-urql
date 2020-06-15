const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Hero {
  _id: ID!
  title: String!
  description: String
  date: String!
}
input HeroInput {
  title: String!
  description: String!
  date: String!
}
input HeroUpdate {
  _id: ID!
  title: String!
  description: String
  date: String!
} 
input HeroRemove {
  _id: ID! 
} 
type RootQuery {
  heroes: [Hero!]!
  findHero(id: ID!): Hero
}
type RootMutation {
  createHero(heroInput: HeroInput): Hero
  deleteHero(heroRemove: HeroRemove): Hero
  updateHero(heroUpdate: HeroUpdate): Hero
}
schema {
  query: RootQuery
  mutation: RootMutation
}
`);