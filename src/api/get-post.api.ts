import { wretchGet } from './ExternalApi';
import { GetPostTO } from './api.types';

type GetPostParams = {
  id: number;
};

export function getPost (params: GetPostParams) {
  return wretchGet<GetPostTO[]>({ params, route: 'posts' });
}