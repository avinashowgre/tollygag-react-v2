import wretch from "wretch";

import { ApiGetConfig, ApiPostConfig } from "./api.types";

const imgFlipApi = wretch()
  // Set the base url
  .url("https://api.imgflip.com/");

export function imgFlipGet<TO = { [key: string]: any }>(
  config: ApiGetConfig
): Promise<TO> {
  const { route, params } = config;
  return imgFlipApi
    .url(route)
    .query(params || {})
    .get()
    .json()
    .then((response) => {
      return response.data;
    });
}

export function imgFlipPost<TO = { [key: string]: any }>(
  config: ApiPostConfig
): Promise<TO> {
  const { body, formData, route } = config;
  return imgFlipApi
    .url(route)
    .body(body)
    .formData(formData || {})
    .post()
    .json();
}
