import request, { setBaseUrl } from "./request";
import {
  getTokenValue,
  generateRefreshToken,
  setToken,
  getTokenType,
} from "./accessToken";
import { requestListDataInBatches } from "./requestListDataInBatches";

export default request;

const ListRequestMaxLength = 50;

export {
  getTokenValue,
  generateRefreshToken,
  setToken,
  getTokenType,
  ListRequestMaxLength,
  requestListDataInBatches,
  setBaseUrl,
};

export type { IRequestParamsInBatches } from "./requestListDataInBatches";
export type { IRequestParams } from "./request";
