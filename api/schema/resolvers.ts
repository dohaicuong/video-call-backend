import { withFilter } from 'graphql-subscriptions'
import {
  QueryResolvers, MutationResolvers, SubscriptionResolvers,
  RoomResolvers, SessionResolvers,
} from '../generated/types'
import { ApolloError } from 'apollo-server'

export type Resolvers = {
  Query: QueryResolvers
  Mutation?: MutationResolvers
  Subscription?: SubscriptionResolvers

  Room?: RoomResolvers
  Session?: SessionResolvers
}

const signallingData = {}

const resolvers: Resolvers = {
  Room: {
    // @ts-ignore
    sessions: (root, __, { prisma }) => prisma.room.findOne({ where: { id: root.id }}).sessions()
  },
  Session: {
    room: (root, __, { prisma }) => prisma.session.findOne({ where: { id: root.id }}).room()
  },
  Query: {
    room: (_, { id }, { prisma }) => {
      return prisma.room.findOne({ where: { id }})
    },
    // @ts-ignore
    session: (_, { id }, { prisma }) => {
      return prisma.session.findOne({ where: { id }})
    }
  },
  Mutation: {
    roomCreate: (_, { input }, { prisma }) => {
      return prisma.room.create({ data: {
        title: input.title
      }})
    },
    roomJoin: async (_, { input }, { prisma }) => {
      // @ts-ignore
      const savedSignallingData = signallingData[input.roomId]
      const inputSignallingData = { sdpOffer: input.sdpOffer, iceCandidates: input.iceCandidates }
      const currentSignallingData = inputSignallingData.sdpOffer ? inputSignallingData : savedSignallingData
      if(!currentSignallingData) throw new ApolloError(`Host haven't joined the room`)
      // @ts-ignore
      signallingData[input.roomId] = currentSignallingData

      const session = await prisma.session.create({ data: {
        name: input.sessionName,
        type: input.sdpOffer ? 'HOST' : 'GUEST',
        room: { connect: { id: input.roomId }},
      }})

      return {
        session,
        ...currentSignallingData
      }
    },
    answerSignalling: async (_, { input: { sessionId, roomId, sdpAnswer, iceCandidates }}, { prisma, pubsub }) => {
      const guestSession = await prisma.session.findOne({ where: { id: sessionId }})
      if(!guestSession || guestSession.type !== 'GUEST') throw new Error('Session is not exited')

      pubsub.publish('signalling', {
        signalling: { roomId, sdpAnswer, iceCandidates }
      })

      return true
    }
  },
  Subscription: {
    signalling: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator('signalling'),
        (payload, variables) => {
          return payload.signalling.roomId === variables.roomId
        }
      ),
    },
  }
}
export default resolvers