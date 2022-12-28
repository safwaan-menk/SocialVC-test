import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Idea = {
  __typename?: 'Idea';
  description: Scalars['String'];
  id: Scalars['ID'];
  idea: Scalars['String'];
};

export type IdeaInput = {
  description: Scalars['String'];
  id: Scalars['ID'];
  idea: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createIdea: Idea;
};


export type MutationCreateIdeaArgs = {
  data: IdeaInput;
};

export type Query = {
  __typename?: 'Query';
  idea?: Maybe<Idea>;
  ideas: Array<Idea>;
};


export type QueryIdeaArgs = {
  id: Scalars['String'];
};

export type CreateIdeaMutationVariables = Exact<{
  data: IdeaInput;
}>;


export type CreateIdeaMutation = { __typename?: 'Mutation', createIdea: { __typename?: 'Idea', id: string, idea: string, description: string } };

export type GetIdeasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIdeasQuery = { __typename?: 'Query', ideas: Array<{ __typename?: 'Idea', id: string, idea: string, description: string }> };

export type IdeaByNameQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type IdeaByNameQuery = { __typename?: 'Query', idea?: { __typename?: 'Idea', idea: string, description: string } | null };


export const CreateIdeaDocument = gql`
    mutation createIdea($data: IdeaInput!) {
  createIdea(data: $data) {
    id
    idea
    description
  }
}
    `;
export const GetIdeasDocument = gql`
    query getIdeas {
  ideas {
    id
    idea
    description
  }
}
    `;
export const IdeaByNameDocument = gql`
    query ideaByName($id: String!) {
  idea(id: $id) {
    idea
    description
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createIdea(variables: CreateIdeaMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateIdeaMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateIdeaMutation>(CreateIdeaDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createIdea', 'mutation');
    },
    getIdeas(variables?: GetIdeasQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetIdeasQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetIdeasQuery>(GetIdeasDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getIdeas', 'query');
    },
    ideaByName(variables: IdeaByNameQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<IdeaByNameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<IdeaByNameQuery>(IdeaByNameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ideaByName', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;