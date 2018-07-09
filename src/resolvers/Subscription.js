function newLinkSubscribe(parent, args, context, info) {
  return context.db.subscription.link({
    where: {
      mutation_in: ['CREATED']
    },
  }, info)
}prism

const newLink = {
  subscribe: newLinkSubscribe
}

module.exports = {
  newLink
}
