# Content Model Migration

Managing the Contentful content model via code allows:

- to develop features, that need model changes
- to integrate automatic content model changes as part of a [continuous integration pipeline](https://www.contentful.com/developers/docs/concepts/deployment-pipeline/)

[Migration scripts](https://github.com/contentful/contentful-migration#usage-as-a-library) are stored in `src/migrations`.
Best practices:

- Prefix script filenames with a number to indicate a clear order, e.g. `01-add-foo.ts`.
- The migration API is designed to to express clearly what is expected and how to change it. Constructs like `if exists` or `upsert` are not encouraged.

Run

```sh
yarn deploy
```

to automatically apply all necessary migrations to an existing Contentful space. The name of the last (in terms of filename order) successfully applied migration script is stored in the description of a special content type. The migrate command will skip already applied scripts.

## Sample data

Sample data scripts are meant to create sample entries and assets. They export an async function, that receives a Contentful space and environment as parameters:

```ts
export default async (space: any, environment: any) => {
```

To run a sample data script in `src/sample-data/foo-bar.ts`, run:

```sh
yarn sample-data foo-bar.ts
```
