import { gql } from 'apollo-server'

export default gql`
  scalar SdpString
  scalar WebrtcIceCandidate

  enum SessionType { HOST GUEST }

  ###########################################################################
  type Room {
    id: ID!
    title: String!
    sessions: [Session!]
  }

  type Session {
    id: ID!
    name: String!
    type: SessionType!
    room: Room
  }

  ###########################################################################
  type Query {
    room(id: ID!): Room
    session(id: ID!): Session
  }

  ###########################################################################
  ### ROOM CREATE ###
  type Mutation {
    roomCreate(input: RoomCreateInput!): Room
  }
  input RoomCreateInput {
    title: String!
  }

  ### ROOM JOIN ###
  extend type Mutation {
    roomJoin(input: RoomJoinInput!): RoomJoinPayload
  }
  input RoomJoinInput {
    roomId: ID!
    sessionName: String!
    sdpOffer: SdpString
    iceCandidates: [WebrtcIceCandidate!]
  }
  type RoomJoinPayload {
    session: Session
    sdpOffer: SdpString
    iceCandidates: [WebrtcIceCandidate!]
  }

  ### ANSWER SIGNALLING ###
  extend type Mutation {
    answerSignalling(input: AnswerSignallingInput!): Boolean
  }
  input AnswerSignallingInput {
    roomId: ID!
    sessionId: ID!
    sdpAnswer: SdpString!
    iceCandidates: [WebrtcIceCandidate!]!
  }

  ###########################################################################
  ### SIGNALLING SUBSCRIPTION ###
  type Subscription {
    signalling(roomId: ID!): SignallingPayload
  }
  type SignallingPayload {
    sdpAnswer: SdpString!
    iceCandidates: [WebrtcIceCandidate!]!
  }
`