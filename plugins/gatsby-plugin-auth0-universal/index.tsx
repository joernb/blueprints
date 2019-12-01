import auth0, {
  Auth0DecodedHash,
  Auth0Error,
  Auth0ParseHashError,
  Auth0UserProfile,
  AuthOptions,
  AuthorizeOptions,
  CheckSessionOptions,
  LogoutOptions,
  ParseHashOptions,
} from "auth0-js";
import { navigate } from "gatsby";
import React, {
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useAsyncCallback, UseAsyncReturn } from "react-async-hook";

export type Options = AuthOptions & {
  silentAuthLocalStorageKey?: string;
  redirectPathLocalStorageKey?: string;
  logoutUrl?: string;
};

export interface AuthContextApi {
  idTokenPayload?: Auth0DecodedHash["idTokenPayload"];
  accessToken?: Auth0DecodedHash["accessToken"];
  scope?: Auth0DecodedHash["scope"];
  error?: Auth0Error;
  authorize: (options?: AuthorizeOptions) => void;
  parseHash: UseAsyncReturn<Auth0UserProfile, [ParseHashOptions?]>;
  silentAuth: UseAsyncReturn<Auth0UserProfile, [CheckSessionOptions?]>;
  logout: (options?: LogoutOptions) => void;
}

const defaultAsyncImpl = {
  execute: () => Promise.reject("Missing provider"),
  loading: false,
  error: undefined,
  result: undefined,
  reset: () => undefined,
  set: () => undefined,
  currentPromise: null,
};

export const AuthContext = React.createContext<AuthContextApi>({
  idTokenPayload: undefined,
  accessToken: undefined,
  scope: undefined,
  error: undefined,
  authorize: () => undefined,
  parseHash: defaultAsyncImpl as any,
  silentAuth: defaultAsyncImpl as any,
  logout: () => undefined,
});

const ensureBrowserEnvironment = () => {
  if (typeof window === "undefined") {
    throw new Error("Not in browser environment!");
  }
};

interface AuthProviderProps {
  options: Options;
  children: ReactNode;
}

export const AuthProvider = ({ options, children }: AuthProviderProps) => {
  const {
    domain,
    logoutUrl,
    silentAuthLocalStorageKey = "silentAuth",
    redirectPathLocalStorageKey = "redirect",
  } = options;

  const [idTokenPayload, setIdTokenPayload] = useState();
  const [scope, setScope] = useState();
  const [accessToken, setAccessToken] = useState();

  // the auth0 instance
  const auth0WebAuth = useMemo(
    () =>
      new auth0.WebAuth({
        ...options,
        responseType: "token id_token",
      }),
    []
  );

  const handleTokens = useCallback(
    (resolve, reject) => (
      hashError: Auth0ParseHashError | null,
      hashResult: Auth0DecodedHash | null
    ) => {
      try {
        if (hashError || hashResult === null) {
          // console.error("HANDLE TOKENS AERROR", err);
          throw hashError ? hashError.errorDescription : "Auth0Error";
        }
        setAccessToken(hashResult.accessToken);
        localStorage.setItem(silentAuthLocalStorageKey, "true");

        setScope(hashResult.scope);

        const redirectPath = localStorage.getItem(redirectPathLocalStorageKey);
        if (redirectPath) {
          localStorage.removeItem(redirectPathLocalStorageKey);
          navigate(redirectPath);
        }

        setIdTokenPayload(hashResult.idTokenPayload);
        resolve(hashResult.idTokenPayload);
      } catch (error) {
        reject(error);
      }
    },
    [domain, silentAuthLocalStorageKey]
  );

  const authorize = useCallback(
    (params: AuthorizeOptions = {}) => {
      ensureBrowserEnvironment();
      localStorage.setItem(
        redirectPathLocalStorageKey,
        window.location.pathname
      );
      auth0WebAuth.authorize(params);
    },
    [auth0WebAuth]
  );

  const parseHash = useAsyncCallback(
    (params: ParseHashOptions = {}) =>
      new Promise<Auth0UserProfile>((resolve, reject) => {
        ensureBrowserEnvironment();
        auth0WebAuth.parseHash(params, handleTokens(resolve, reject));
      })
  );

  const silentAuth = useAsyncCallback(
    (params: CheckSessionOptions = {}) =>
      new Promise<Auth0UserProfile>((resolve, reject) => {
        ensureBrowserEnvironment();
        if (localStorage.getItem(silentAuthLocalStorageKey) === "true") {
          localStorage.setItem(silentAuthLocalStorageKey, "false");
          auth0WebAuth.checkSession(params, handleTokens(resolve, reject));
        } else {
          reject("silentAuthLocalStorageKey not set!");
        }
      })
  );

  const logout = useCallback(
    (params: LogoutOptions = { returnTo: logoutUrl }) => {
      ensureBrowserEnvironment();
      localStorage.setItem(silentAuthLocalStorageKey, "false");
      auth0WebAuth.logout(params);
    },
    [auth0WebAuth]
  );

  // context api
  const provided = useMemo(
    () => ({
      idTokenPayload,
      accessToken,
      scope,
      authorize,
      parseHash,
      silentAuth,
      logout,
    }),
    [
      idTokenPayload,
      accessToken,
      scope,
      authorize,
      parseHash,
      silentAuth,
      logout,
    ]
  );

  return (
    <AuthContext.Provider value={provided}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
