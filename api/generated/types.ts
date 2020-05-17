import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  SdpString: any;
  WebrtcIceCandidate: any;
};

export type AnswerSignallingInput = {
  roomId: Scalars['ID'];
  sessionId: Scalars['ID'];
  sdpAnswer: Scalars['SdpString'];
  iceCandidates: Array<Scalars['WebrtcIceCandidate']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  answerSignalling?: Maybe<Scalars['Boolean']>;
  roomCreate?: Maybe<Room>;
  roomJoin?: Maybe<RoomJoinPayload>;
};


export type MutationAnswerSignallingArgs = {
  input: AnswerSignallingInput;
};


export type MutationRoomCreateArgs = {
  input: RoomCreateInput;
};


export type MutationRoomJoinArgs = {
  input: RoomJoinInput;
};

export type Query = {
   __typename?: 'Query';
  room?: Maybe<Room>;
  session?: Maybe<Session>;
};


export type QueryRoomArgs = {
  id: Scalars['ID'];
};


export type QuerySessionArgs = {
  id: Scalars['ID'];
};

export type Room = {
   __typename?: 'Room';
  id: Scalars['ID'];
  title: Scalars['String'];
  sessions?: Maybe<Array<Session>>;
};

export type RoomCreateInput = {
  title: Scalars['String'];
};

export type RoomJoinInput = {
  roomId: Scalars['ID'];
  sessionName: Scalars['String'];
  sdpOffer?: Maybe<Scalars['SdpString']>;
  iceCandidates?: Maybe<Array<Scalars['WebrtcIceCandidate']>>;
};

export type RoomJoinPayload = {
   __typename?: 'RoomJoinPayload';
  session?: Maybe<Session>;
  sdpOffer?: Maybe<Scalars['SdpString']>;
  iceCandidates?: Maybe<Array<Scalars['WebrtcIceCandidate']>>;
};


export type Session = {
   __typename?: 'Session';
  id: Scalars['ID'];
  name: Scalars['String'];
  type: SessionType;
  room?: Maybe<Room>;
};

export enum SessionType {
  Host = 'HOST',
  Guest = 'GUEST'
}

export type SignallingPayload = {
   __typename?: 'SignallingPayload';
  sdpAnswer: Scalars['SdpString'];
  iceCandidates: Array<Scalars['WebrtcIceCandidate']>;
};

export type Subscription = {
   __typename?: 'Subscription';
  signalling?: Maybe<SignallingPayload>;
};


export type SubscriptionSignallingArgs = {
  roomId: Scalars['ID'];
};




export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Room: ResolverTypeWrapper<Room>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Session: ResolverTypeWrapper<Session>,
  SessionType: SessionType,
  Mutation: ResolverTypeWrapper<{}>,
  AnswerSignallingInput: AnswerSignallingInput,
  SdpString: ResolverTypeWrapper<Scalars['SdpString']>,
  WebrtcIceCandidate: ResolverTypeWrapper<Scalars['WebrtcIceCandidate']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  RoomCreateInput: RoomCreateInput,
  RoomJoinInput: RoomJoinInput,
  RoomJoinPayload: ResolverTypeWrapper<RoomJoinPayload>,
  Subscription: ResolverTypeWrapper<{}>,
  SignallingPayload: ResolverTypeWrapper<SignallingPayload>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  ID: Scalars['ID'],
  Room: Room,
  String: Scalars['String'],
  Session: Session,
  SessionType: SessionType,
  Mutation: {},
  AnswerSignallingInput: AnswerSignallingInput,
  SdpString: Scalars['SdpString'],
  WebrtcIceCandidate: Scalars['WebrtcIceCandidate'],
  Boolean: Scalars['Boolean'],
  RoomCreateInput: RoomCreateInput,
  RoomJoinInput: RoomJoinInput,
  RoomJoinPayload: RoomJoinPayload,
  Subscription: {},
  SignallingPayload: SignallingPayload,
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  answerSignalling?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAnswerSignallingArgs, 'input'>>,
  roomCreate?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType, RequireFields<MutationRoomCreateArgs, 'input'>>,
  roomJoin?: Resolver<Maybe<ResolversTypes['RoomJoinPayload']>, ParentType, ContextType, RequireFields<MutationRoomJoinArgs, 'input'>>,
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  room?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType, RequireFields<QueryRoomArgs, 'id'>>,
  session?: Resolver<Maybe<ResolversTypes['Session']>, ParentType, ContextType, RequireFields<QuerySessionArgs, 'id'>>,
};

export type RoomResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  sessions?: Resolver<Maybe<Array<ResolversTypes['Session']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type RoomJoinPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RoomJoinPayload'] = ResolversParentTypes['RoomJoinPayload']> = {
  session?: Resolver<Maybe<ResolversTypes['Session']>, ParentType, ContextType>,
  sdpOffer?: Resolver<Maybe<ResolversTypes['SdpString']>, ParentType, ContextType>,
  iceCandidates?: Resolver<Maybe<Array<ResolversTypes['WebrtcIceCandidate']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface SdpStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SdpString'], any> {
  name: 'SdpString'
}

export type SessionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  type?: Resolver<ResolversTypes['SessionType'], ParentType, ContextType>,
  room?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SignallingPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SignallingPayload'] = ResolversParentTypes['SignallingPayload']> = {
  sdpAnswer?: Resolver<ResolversTypes['SdpString'], ParentType, ContextType>,
  iceCandidates?: Resolver<Array<ResolversTypes['WebrtcIceCandidate']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SubscriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  signalling?: SubscriptionResolver<Maybe<ResolversTypes['SignallingPayload']>, "signalling", ParentType, ContextType, RequireFields<SubscriptionSignallingArgs, 'roomId'>>,
};

export interface WebrtcIceCandidateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['WebrtcIceCandidate'], any> {
  name: 'WebrtcIceCandidate'
}

export type Resolvers<ContextType = Context> = {
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Room?: RoomResolvers<ContextType>,
  RoomJoinPayload?: RoomJoinPayloadResolvers<ContextType>,
  SdpString?: GraphQLScalarType,
  Session?: SessionResolvers<ContextType>,
  SignallingPayload?: SignallingPayloadResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  WebrtcIceCandidate?: GraphQLScalarType,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
