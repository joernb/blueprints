import React from "react";
import { Router } from "@reach/router";
import GraphqlTemplate from "../../templates/graphql";

const ClientSidePage = (props: {}) => {
  return (
    <Router>
      <GraphqlTemplate path="/sample/client-side/graphql" />
    </Router>
  );
};

export default ClientSidePage;
