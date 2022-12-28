import {
    buildSchema,
    Resolver,
    Query,
    Arg,
    ObjectType,
    Field,
    ID
} from "type-graphql";


@ObjectType()
export class Idea {
    @Field(() => ID)
    id: string
    
    @Field(() => String)
    idea: string;

    @Field(() => String)
    description: string;
}
