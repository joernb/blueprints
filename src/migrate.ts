// tslint:disable:no-console
import fs from "fs";
import path from "path";
import { createClient } from "contentful-management";
import { runMigration } from "contentful-migration/built/bin/cli";

const CONTENTFUL_CONTENT_TYPE_ID = "migrations";
const CONTENTFUL_CONTENT_TYPE_NAME = "Migration_Info_Do_Not_Edit";
const MIGRATIONS_DIR = path.join(__dirname, "./migrations");

const filenames = fs.readdirSync(MIGRATIONS_DIR);

/**
 * Apply all migration scripts. The last applied filename is stored in the description of the migrations content type.
 */
(async () => {
  try {
    // get or create content type of CONTENTFUL_CONTENT_TYPE_ID
    const client = createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    });
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment(
      process.env.CONTENTFUL_ENVIRONMENT
    );
    let migrations;
    try {
      migrations = await environment.getContentType(CONTENTFUL_CONTENT_TYPE_ID);
    } catch (error) {
      migrations = await environment.createContentTypeWithId(
        CONTENTFUL_CONTENT_TYPE_ID,
        {
          name: CONTENTFUL_CONTENT_TYPE_NAME,
        }
      );
    }

    // iterate filenames and apply scripts
    for (
      let i = filenames.indexOf(migrations.description) + 1;
      i < filenames.length;
      i++
    ) {
      const filePath = path.join(MIGRATIONS_DIR, filenames[i]);
      console.log(`Applying migration script ${filePath}`);
      // workaround for broken syntax error handling in runMigration
      // see https://github.com/contentful/contentful-migration/blob/f508a9905fda0fa858b0bc2ed4a733e22445bbcb/src/bin/cli.ts#L54
      require(filePath);
      // run migration
      await runMigration({
        filePath,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
        yes: true,
      });
      migrations.description = filenames[i];
      await migrations.update();
      migrations = await environment.getContentType(CONTENTFUL_CONTENT_TYPE_ID);
    }
    console.log(`All migration scripts applied`);
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
})();
