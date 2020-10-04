import faker from "faker";
import { PostTO } from "../api.types";

export function postsFakerResponse(responseLen: number = 3): PostTO[] {
  let response: PostTO[] = [];
  for (let i = 0; i <= responseLen; i++) {}
  return response;
}
