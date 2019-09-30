import React, { useContext } from "react";

export const LocationContext = React.createContext(undefined);
export const useLocation = () => useContext(LocationContext);
