import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import React from "react";

/**
 * See {@link https://www.contentful.com/developers/docs/tutorials/general/rich-text-and-gatsby/ RichText and Gatsby}
 */
const options: Options = {
  renderMark: {},
  renderNode: {},
  renderText: text => <>{text}</>,
};

interface Props {
  doc: Document;
}

const ContentfulRichText = ({ doc }: Props) => {
  return <>{documentToReactComponents(doc, options)}</>;
};

export default ContentfulRichText;
