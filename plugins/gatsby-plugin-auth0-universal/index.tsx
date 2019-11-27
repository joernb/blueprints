import auth0, {
  Auth0DecodedHash,
  Auth0Error,
  Auth0ParseHashError,
  Auth0UserProfile,
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

export interface Options {
  domain: string;
  clientID: string;
  redirectUri: string;
  silentAuthFlag?: string;
  redirectFlag?: string;
  logoutUrl?: string;
}

export interface AuthContextApi {
  userInfo?: Auth0UserProfile;
  accessToken?: Auth0DecodedHash["accessToken"];
  error?: Auth0Error;
  authorize: (options?: AuthorizeOptions) => void;
  parseHash: UseAsyncReturn<Auth0UserProfile, [ParseHashOptions?]>;
  silentAuth: UseAsyncReturn<Auth0UserProfile, [CheckSessionOptions?]>;
  logout: (options?: LogoutOptions) => void;
  patchUserMetadata: UseAsyncReturn<Auth0UserProfile, [string, any]>;
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
  userInfo: undefined,
  accessToken: undefined,
  error: undefined,
  authorize: () => undefined,
  parseHash: defaultAsyncImpl as any,
  silentAuth: defaultAsyncImpl as any,
  logout: () => undefined,
  patchUserMetadata: defaultAsyncImpl as any,
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
    silentAuthFlag = "silentAuth",
    redirectFlag = "redirect",
  } = options;

  const [userInfo, setUserInfo] = useState();
  const [accessToken, setAccessToken] = useState();

  // the auth0 instance
  const auth0WebAuth = useMemo(
    () =>
      new auth0.WebAuth({
        ...options,
        responseType: "token id_token",
        audience: `https://${domain}/api/v2/`,
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
        localStorage.setItem(silentAuthFlag, "true");

        const redirectPath = localStorage.getItem(redirectFlag);
        if (redirectPath) {
          localStorage.removeItem(redirectFlag);
          navigate(redirectPath);
        }

        const auth0Management = new auth0.Management({
          domain,
          token: hashResult.accessToken,
        });
        auth0Management.getUser(
          hashResult.idTokenPayload.sub,
          (userError, userResult) => {
            if (!userError) {
              setUserInfo(userResult);
              resolve(userResult);
            } else {
              reject(userError);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    },
    [domain, silentAuthFlag]
  );

  const authorize = useCallback(
    (params: AuthorizeOptions = {}) => {
      ensureBrowserEnvironment();
      localStorage.setItem(redirectFlag, window.location.pathname);
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
        if (localStorage.getItem(silentAuthFlag) === "true") {
          localStorage.setItem(silentAuthFlag, "false");
          auth0WebAuth.checkSession(params, handleTokens(resolve, reject));
        } else {
          reject("silentAuthFlag not set!");
        }
      })
  );

  const logout = useCallback(
    (params: LogoutOptions = { returnTo: logoutUrl }) => {
      ensureBrowserEnvironment();
      localStorage.setItem(silentAuthFlag, "false");
      auth0WebAuth.logout(params);
    },
    [auth0WebAuth]
  );

  const patchUserMetadata = useAsyncCallback(
    (subject: string, metadata: any) =>
      new Promise<Auth0UserProfile>((resolve, reject) => {
        new auth0.Management({
          domain,
          token: accessToken,
        }).patchUserMetadata(subject, metadata, (err, result) => {
          if (!err) {
            setUserInfo(result);
            resolve(result);
          } else {
            reject(err);
          }
        });
      })
  );

  // context api
  const provided = useMemo(
    () => ({
      userInfo,
      accessToken,
      authorize,
      parseHash,
      silentAuth,
      logout,
      patchUserMetadata,
    }),
    [
      userInfo,
      accessToken,
      authorize,
      parseHash,
      silentAuth,
      logout,
      patchUserMetadata,
    ]
  );

  return (
    <AuthContext.Provider value={provided}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
