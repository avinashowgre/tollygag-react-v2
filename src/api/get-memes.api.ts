import { imgFlipGet } from './ImgFlipApi';
import { MemeTO } from './api.types';

type GetMemesResponse = {
  memes: MemeTO[]
}

export function getMemes() {
  return imgFlipGet<GetMemesResponse>({ route: 'get_memes' });
}