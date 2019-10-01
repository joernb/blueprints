import Migration, { MigrationContext } from "contentful-migration";

export = (migration: Migration, migrationContext: MigrationContext) => {
  const staticTextType = migration
    .createContentType("static-text")
    .name("Static Text")
    .displayField("name");
  staticTextType
    .createField("name")
    .name("Name")
    .type("Symbol")
    .required(true);
  staticTextType
    .createField("shortText")
    .name("Short text")
    .type("Symbol")
    .localized(true);
  staticTextType
    .createField("longText")
    .name("Long text")
    .type("Text")
    .localized(true);
  staticTextType
    .createField("richText")
    .name("Rich text")
    .type("RichText")
    .localized(true);
};
