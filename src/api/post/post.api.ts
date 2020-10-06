import { wretchGet } from "../ExternalApi";
import { PostTO } from "../api.types";

type GetPostParams = {
  id: number;
};

export function getPost(params: GetPostParams) {
  return wretchGet<PostTO[]>({ params, route: "posts" });
}
