import {Resolver, Query, Arg, Mutation, Field, InputType, ID} from "type-graphql"
import { Idea } from "./ideas"
import ideas from "./ideas.json";
import fs from 'fs';


@InputType()
class IdeaInput {
    @Field(() => ID)
    id!: string
    
    @Field(() => String)
    idea!: string;

    @Field(() => String)
    description!: string;
}

@Resolver(Idea)
export class IdeasResolver {
    @Query(() => Idea, {nullable: true})
    idea(@Arg("id", () => String) id: string): Idea | undefined {
        const idea = ideas.find((idea) => idea.id === id);
        if(idea === undefined) {
            throw new Error("Post deleted or does not exist");
        }
        return idea;
    }

    @Query(() => [Idea])
    ideas(): Idea[] {

        return ideas;
    }

    @Mutation(() => Idea)
     async createIdea(@Arg('data') data: IdeaInput): Promise<Idea> {
        // Process the input data and save it to your database or any other persistence layer
        const newIdea = new Idea();
        newIdea.id = data.id;
        newIdea.idea = data.idea;
        newIdea.description = data.description;
        ideas.push(newIdea);
        // Read the existing data from the data.json file
        const existingData = JSON.parse(fs.readFileSync("C:/socialvc/src/schema/ideas.json").toString());

        // Add the new idea to the existing data
        const updatedData = [...existingData, newIdea];

        // Update the data.json file with the updated data
        fs.writeFileSync("C:/socialvc/src/schema/ideas.json", JSON.stringify(updatedData));
        return newIdea;
    }


}

