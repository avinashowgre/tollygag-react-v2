import { wretchGet } from "../ExternalApi";

import { PostTO } from "../api.types";

type GetPostsResponse = {
  items: PostTO[];
};

export function getPosts() {
  return wretchGet<GetPostsResponse>({ route: "posts" });
}
