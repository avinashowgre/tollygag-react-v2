import { wretchGet } from "./ExternalApi";
import { PostCommentTO } from "./api.types";

type GetPostCommentsParams = {
  id: number;
};

export function getPostComments(params: GetPostCommentsParams) {
  const { id } = params;
  return wretchGet<PostCommentTO[]>({ route: `posts/${id}/comments` });
}
