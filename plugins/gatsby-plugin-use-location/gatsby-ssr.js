const React = require("react");
const { LocationContext } = require(".");

exports.wrapPageElement = ({ element, props }) => (
  <LocationContext.Provider value={{ location: props.location, navigate: props.navigate }}>
    {element}
  </LocationContext.Provider>
);
