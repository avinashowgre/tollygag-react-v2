import { wretchGet } from './ExternalApi';
import { GetPostCommentTO } from './api.types';

type GetPostCommentsParams = {
  id: number;
};

export function getPostComments (params: GetPostCommentsParams) {
  const { id } = params;
  return wretchGet<GetPostCommentTO[]>({ route: `posts/${id}/comments` });
}