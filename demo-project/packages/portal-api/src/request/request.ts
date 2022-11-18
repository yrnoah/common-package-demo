import GeneralError from "./GeneralError";
import UnkownError from "./UnkownError";
import {
  getTokenValue,
  generateRefreshToken,
  setToken,
  getTokenType,
} from "./accessToken";

let _baseUrl = "";

export const setBaseUrl = (url: string) => {
  _baseUrl = url;
};

function buildGetPath(basePath: string, data: { [key: string]: any }) {
  const params: string[] = [];
  Object.keys(data).forEach((key) => {
    const encodeKey = encodeURIComponent(key);
    const value = data[key];
    const valueType = typeof value;

    if (valueType === "string") {
      params.push(`${encodeKey}=${encodeURIComponent(value)}`);
    } else if (valueType === "number") {
      params.push(`${encodeKey}=${value}`);
    } else if (valueType === "boolean") {
      params.push(`${encodeKey}=${value}`);
    }
  });

  if (params.length === 0) {
    return basePath;
  }
  return `${basePath}?${params.join("&")}`;
}

export interface IRequestParams {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  data?: FormData | { [key: string]: any } | string;
  includeCredentials?: boolean;
  refreshOnUnauthorized?: boolean;
  noToken?: boolean;
  tokenKey?: string;
  contentType?: string;
  replaceBaseUrl?: string;
  mode?: "cors" | "navigate" | "no-cors" | "same-origin";
  language?: string;
}

async function request<T>(params: IRequestParams) {
  const {
    method,
    path,
    data,
    includeCredentials,
    refreshOnUnauthorized,
    noToken,
    tokenKey,
    contentType,
    replaceBaseUrl,
    mode,
    language,
  } = params;
  const baseUrl = replaceBaseUrl || _baseUrl;
  if (!baseUrl) {
    throw new UnkownError(417, "please set project's baseUrl");
  }
  const accessToken = getTokenValue();
  const tokenType = getTokenType() || "Bearer";
  const requestPath =
    method === "GET" && data && !(typeof data === "string")
      ? buildGetPath(path, data)
      : path;
  const isRequestJson = method !== "GET" && !(data instanceof FormData);

  let response;
  try {
    response = await window.fetch(`${baseUrl}${requestPath}`, {
      method,
      mode,
      headers: {
        ...(language ? { "Accept-Language": language } : {}),
        ...(isRequestJson ? { "Content-Type": "application/json" } : {}),
        ...(contentType ? { "Content-Type": contentType } : {}),
        ...(!noToken && accessToken
          ? { Authorization: `${tokenType} ${accessToken}` }
          : {}),
      },
      ...(method === "GET"
        ? {}
        : {
            body:
              data instanceof FormData || typeof data === "string"
                ? data
                : JSON.stringify(data),
          }),
      ...(includeCredentials ? { credentials: "include" } : {}),
    });
  } catch (e) {
    throw e;
  }

  const { status, statusText } = response;
  const responseType = response.headers.get("content-type") || "";
  const payload = await (responseType.indexOf("application/json") === -1
    ? response.text()
    : response.json());

  const payloadError =
    typeof payload === "object" && (payload.error || payload.message)
      ? new GeneralError(
          status,
          payload.error || payload.message,
          payload.message || payload.error
        )
      : new UnkownError(status, statusText);
  if (status === 401 && refreshOnUnauthorized) {
    try {
      const refreshToken = await generateRefreshToken();
      if (refreshToken && tokenKey) {
        setToken(tokenKey, {
          ...refreshToken,
          accessToken: refreshToken.accessToken,
          tokenType: refreshToken.tokenType,
          authorities: refreshToken.authorities || [],
          brandInPortal: refreshToken.brandInPortal,
        });
      }
    } catch (e) {
      throw payloadError;
    }
    const returnValue: T = await request<T>({
      ...params,
      refreshOnUnauthorized: false,
    });

    return returnValue;
  }

  if (status >= 400 && status < 600) {
    throw payloadError;
  }
  return payload as T;
}

export default request;
