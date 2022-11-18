import type { IAccessToken } from "../typings/user";

// should init in App.tsx with project token key
let accessToken: IAccessToken | undefined = undefined;

export const setToken = (tokenKey: string, token?: IAccessToken) => {
  if (token) localStorage.setItem(tokenKey, JSON.stringify(token));
  accessToken = token;
};

export const clearToken = (tokenKey: string) => {
  if (localStorage.getItem(tokenKey)) localStorage.removeItem(tokenKey);
  accessToken = undefined;
};

export const getToken = () => accessToken;
export const getTokenValue = () => accessToken?.accessToken;
export const getTokenType = () => accessToken?.tokenType;
export const getAuthorities = () => accessToken?.authorities;
export const getBrandInPortal = () => accessToken?.brandInPortal;

let refreshTokenGenerator:
  | (() => Promise<IAccessToken | undefined>)
  | undefined;
export const configureTokenRefresh = (
  generator?: () => Promise<IAccessToken | undefined>
) => {
  refreshTokenGenerator = generator;
};

export const generateRefreshToken = (() => {
  let refreshTokenPromise: Promise<IAccessToken | undefined> | undefined;

  return async () => {
    if (!refreshTokenGenerator) {
      throw new Error("refresh token generator not set");
    }

    if (!refreshTokenPromise) {
      try {
        refreshTokenPromise = refreshTokenGenerator();
        return await refreshTokenPromise;
      } finally {
        refreshTokenPromise = undefined;
      }
    }

    return await refreshTokenPromise;
  };
})();
