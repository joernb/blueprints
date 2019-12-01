import React, { ReactNode, useEffect, useMemo } from "react";
import { AuthorizeOptions } from "auth0-js";
import { useAuth } from ".";

interface Props {
  children?: ReactNode;
  requiredScopes?: string[];
  authorizeWithOptions?: AuthorizeOptions;
  renderDenied?: ReactNode;
}

const RestrictedAccess = ({
  children,
  requiredScopes,
  authorizeWithOptions,
  renderDenied,
}: Props) => {
  const { scope, authorize } = useAuth();
  const authorized = useMemo(() => {
    if (!scope) {
      return false;
    }
    if (
      requiredScopes &&
      requiredScopes.some(requiredScope => scope.indexOf(requiredScope) < 0)
    ) {
      return false;
    }

    return true;
  }, [scope, requiredScopes]);

  useEffect(() => {
    if (!authorized && authorizeWithOptions) {
      authorize(authorizeWithOptions);
    }
  }, [authorized]);

  return <>{authorized ? children : renderDenied}</>;
};

export default RestrictedAccess;
