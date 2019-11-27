// tslint:disable:no-console
import { createClient } from "contentful-management";
import { ContentType } from "contentful-management/typings/contentType";
import { runMigration } from "contentful-migration/built/bin/cli";
import fs from "fs";
import path from "path";
//
const MIGRATION_CONTENT_TYPE_ID = "migrations";
const MIGRATION_CONTENT_TYPE_NAME = "Migration Tracking";
const MIGRATIONS_DIR = path.join(__dirname, "./migrations");

const filenames = fs.readdirSync(MIGRATIONS_DIR);

const getMigrationField = (filename: string): string =>
  "migration_" + path.basename(filename).replace(/[.-]/g, "_");

const isMigrationTracked = (
  migrationContentType: ContentType,
  migrationField: string
): boolean =>
  migrationContentType.fields.filter(field => field.id === migrationField)
    .length > 0;

const trackMigration = async (
  migrationContentType: ContentType,
  migrationField: string
) => {
  migrationContentType.fields.push({
    id: migrationField,
    name: migrationField,
    type: "Symbol",
    localized: false,
    required: false,
  });
  await migrationContentType.update();
};

/**
 * Apply all migration scripts. The last applied filename is stored in the description of the migrations content type.
 */
(async () => {
  try {
    // get or create content type of MIGRATION_CONTENT_TYPE_ID
    const client = createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN || "",
    });
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID || "");
    const environment = await space.getEnvironment(
      process.env.CONTENTFUL_ENVIRONMENT || ""
    );
    let migrations;
    try {
      migrations = await environment.getContentType(MIGRATION_CONTENT_TYPE_ID);
    } catch (error) {
      migrations = await environment.createContentTypeWithId(
        MIGRATION_CONTENT_TYPE_ID,
        {
          name: MIGRATION_CONTENT_TYPE_NAME,
          description: "",
          fields: [],
        } as any
      );
    }

    // iterate filenames and apply scripts
    for (const filename of filenames) {
      const filePath = path.join(MIGRATIONS_DIR, filename);
      const migrationField = getMigrationField(filename);

      if (isMigrationTracked(migrations, migrationField)) {
        console.log(
          `Found ${migrationField} field in ${MIGRATION_CONTENT_TYPE_ID} content type, skipping migration script ${filePath}`
        );
      } else {
        console.log(
          `Did not find ${migrationField} field in ${MIGRATION_CONTENT_TYPE_ID} content type, applying migration script ${filePath}`
        );

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

        await trackMigration(migrations, migrationField);
        migrations = await environment.getContentType(
          MIGRATION_CONTENT_TYPE_ID
        );
      }
    }
    console.log(`All migration scripts processed`);
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
})();
