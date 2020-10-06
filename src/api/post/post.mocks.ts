import { rest } from "msw";

import { postDummyResponse } from "./post.dummy-data";

const postResponse = postDummyResponse();

export const postsMocks = [
  rest.get(
    "http://the-tollygag.an.r.appspot.com/_ah/api/tg/v1/post/123",
    (req, res, ctx) => {
      // If authenticated, return a mocked user details
      return res(ctx.status(200), ctx.json(postResponse));
    }
  ),
];
