import { wretchGet } from './ExternalApi';

import { GetPostTO } from './api.types';

type GetPostsParams = any;

type GetPostsResponse = {
  items: GetPostTO[]
}

export function getPosts () {
  return wretchGet<GetPostsResponse>({ route: 'posts' });
}