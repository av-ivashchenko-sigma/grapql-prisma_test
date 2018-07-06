const {
  Prisma
} = require('prisma-binding')

const {
  GraphQLServer
} = require('graphql-yoga')

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info)
    },
    link: (id) => {
      return links.find(function(obj) {
        return obj.id === id
      })
    },
  },
  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description,
        },
      }, info)
    },
  }
  //
  // updateLink: (id, url, description) => {
  //   var link = links.find(function (obj) { return obj.id === id })
  //   const updatedLink = {
  //     id: link.id,
  //     description: link.description,
  //     url: link.url,
  //   }
  //   links.pop(link)
  //   links.push(updatedLink)
  //   return link
  // },
  //
  // deleteLink: (id) => {
  //   var link = links.find(function (obj) { return obj.id === id })
  //   links.pop(link)
  //   return link
  // }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://localhost:4000',
      debug: true,
    })
  })
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
