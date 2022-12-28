import {GraphQLClient} from "graphql-request"
import { QueryClient } from "react-query"
import { getSdk } from "./generated/graphql"

const gqlClient = new GraphQLClient("https://socialvc.netlify.app/api/graphql");

export const { getIdeas, ideaByName, createIdea } =  getSdk(gqlClient);

export const queryClient = new QueryClient( {
    defaultOptions: {
        queries :{
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false
        },
        mutations:{
            
        }
    },
});