import React from "react";
import { LocationContext as ReachLocationContext } from "@reach/router";

export type LocationContext = ReachLocationContext;
export const useLocation: () => LocationContext;
