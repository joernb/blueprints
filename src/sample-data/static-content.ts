import * as fs from "fs";
import * as path from "path";

const sampleRichTextDocument = JSON.parse(
  fs
    .readFileSync(path.join(__dirname, "assets", "sample-text-richtext.json"))
    .toString()
);

export default async (space: any, environment: any) => {
  const sampleText = await environment.createEntry("static-text", {
    fields: {
      name: {
        "en-US": "sampleText",
      },
      shortText: {
        "en-US": "My sample text",
        de: "Mein Beispieltext",
      },
      richText: {
        "en-US": sampleRichTextDocument,
      },
    },
  });
  await sampleText.publish();

  // image file
  const fileName = "sample-image.jpg";
  const contentType = "image/jpg";

  // create upload
  const upload = await environment.createUpload({
    file: fs.readFileSync(path.join(__dirname, "assets", fileName)),
    contentType,
    fileName,
  });

  // create asset from upload
  let asset = await environment.createAsset({
    fields: {
      title: {
        "en-US": "sampleImage",
      },
      file: {
        "en-US": {
          fileName,
          contentType,
          uploadFrom: {
            sys: {
              type: "Link",
              linkType: "Upload",
              id: upload.sys.id,
            },
          },
        },
      },
    },
  });

  // process asset
  await asset.processForAllLocales();

  // workaround for version conflict https://github.com/contentful/contentful-management.js/issues/101
  asset = await environment.getAsset(asset.sys.id);

  // publish
  await asset.publish();
};
