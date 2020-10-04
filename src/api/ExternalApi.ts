import wretch from "wretch";

import { ApiGetConfig, ApiPostConfig } from "./api.types";

const externalApi = wretch()
  // Set the base url
  .url("http://the-tollygag.an.r.appspot.com/_ah/api/tg/v1/")
  // Cors fetch options
  .options({ credentials: "include", mode: "cors" });

export function wretchGet<TO = { [key: string]: any }>(
  config: ApiGetConfig
): Promise<TO> {
  const { route, params } = config;
  return externalApi
    .url(route)
    .query(params || {})
    .get()
    .json();
}

export function wretchPost<TO = { [key: string]: any }>(
  config: ApiPostConfig
): Promise<TO> {
  const { body, formData, route } = config;
  return externalApi
    .url(route)
    .body(body)
    .formData(formData || {})
    .post()
    .json();
}
