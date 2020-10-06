import dummyjson from "dummy-json";

export function postDummyResponse(responseLen: number = 3) {
  const template = ``;

  return JSON.parse(dummyjson.parse(template));
}
