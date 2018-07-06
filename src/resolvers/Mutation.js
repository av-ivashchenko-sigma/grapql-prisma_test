const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {
  APP_SECRET,
  getUserId
} = require('../utilsa')

function post(parent, args, context, info) {
  const userId = getUserId(context)
  return context.db.mutation.createLink({
    data: {
      url: args.url,
      description: args.description,
      postedBy: {
        connect: {
          id: userId
        }
      },
    },
    info,
  })
}
