import { ApolloServer } from 'apollo-server'
import schema from './schema'
import { createContext } from './context'

import { PORT } from './configs'

new ApolloServer({
  schema,
  context: createContext
})
  .listen({ port: PORT })
  .then(({ url }) => console.log(url))