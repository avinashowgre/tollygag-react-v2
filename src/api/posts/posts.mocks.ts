import { rest } from "msw";

import { postsDummyResponse } from "./posts.dummy-data";

const postsResponse = postsDummyResponse();

export const postsMocks = [
  rest.get(
    "http://the-tollygag.an.r.appspot.com/_ah/api/tg/v1/posts",
    (req, res, ctx) => {
      // If authenticated, return a mocked user details
      return res(ctx.status(200), ctx.json(postsResponse));
    }
  ),
];
