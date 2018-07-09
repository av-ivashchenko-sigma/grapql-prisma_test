const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')

const {
  Prisma
} = require('prisma-binding')

const {
  GraphQLServer
} = require('graphql-yoga')

const resolvers = {
  Query,
  Mutation,
  AuthPayload
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/aleksandr-ivashchenko/test_graphql_prisma/dev',
      debug: true,
    })
  })
})

server.start(() => console.log(`Server is running on dev env`))
