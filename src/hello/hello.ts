import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Hello {
  @Field(type => ID)
  public id: string;

  @Field(type => String)
  public title: string;

  @Field(type => [String])
  public tags: string[];
}
