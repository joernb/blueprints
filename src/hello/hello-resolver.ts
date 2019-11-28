import { Resolver, Query, Arg } from "type-graphql";
import { Hello } from "./hello";

@Resolver(Hello)
export class HelloResolver {
  @Query(() => Hello)
  public hello() {
    return {
      id: "42",
      title: "Hello World",
      tags: ["value1", "value2", "value3"],
    };
  }
  @Query(() => Hello)
  public helloWithArgs(@Arg("title") title: string) {
    return {
      id: "42",
      title,
      tags: ["value1", "value2", "value3"],
    };
  }
}
