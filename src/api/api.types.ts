export type ApiGetConfig = {
  params?: any;
  route: string;
};

export type ApiPostConfig = {
  body?: any;
  formData?: any;
  route: string;
};

type Metadata = {
  size: {
    width: number;
    height: number;
  }
}

type Author = {
  headline: string;
  id: string;
  image: {
    url: string;
    meta: Metadata;
  }
  name: string;
}

type SocialStats = {
  comments: number;
  downvotes: number;
  upvotes: number;
}

type Content = {
  meta: Metadata;
  source: string;
  subType: string;
  type: string;
  url: string;
}

export type GetPostTO = {
  author: Author;
  body: string;
  content: Content;
  createdAt: string;
  id: number;
  socialStats: SocialStats;
  title: string;
  type: string;
}

export type GetPostCommentTO = {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
}

export type MemeTO = {
  box_count: number;
  height: string;
  id: string;
  name: string;
  url: string;
  width: string;
}