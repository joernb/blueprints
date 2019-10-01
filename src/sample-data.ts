// tslint:disable:no-console
import { createClient } from "contentful-management";
import path from "path";

const SAMPLE_DATA_DIR = path.join(__dirname, "./sample-data");

const filePath = path.join(
  SAMPLE_DATA_DIR,
  // last command line param
  process.argv[process.argv.length - 1]
);

/**
 * Execute sample data script provided via last command line param
 */
(async () => {
  try {
    const func = require(filePath).default;
    const client = createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    });
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment(
      process.env.CONTENTFUL_ENVIRONMENT
    );
    console.log(`Executing sample data script ${filePath}`);
    await func(space, environment);
    console.log(`Script executed.`);
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
})();
