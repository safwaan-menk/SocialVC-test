import { ApolloServer } from "apollo-server-micro";
import "reflect-metadata";

import { buildSchema } from "type-graphql";
import  {IdeasResolver}  from "../../src/schema/ideas.resolver";


const schema =  await buildSchema({
    validate: { forbidUnknownValues: false },
    resolvers: [IdeasResolver]
});

const server = new ApolloServer({
schema
});

export const config = {
    api: {
        bodyParser: false
    }
}

const startServer = server.start()

export default async function handler (req: any, res: any){
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://studio.apollographql.com"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD"
    );
    if (req.method === "OPTIONS") {
        res.end();
        return false;
    }
    await startServer;
    await server.createHandler({ path: "/api/graphql"})(req, res);
}
