import React, { ReactNode, useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";

import { PostTO } from "../api/api.types";
import { getPost } from "../api/post/post.api";

import CircularProgress from "@material-ui/core/CircularProgress";

import { CommentsSection } from "../components/atoms/Comments";
import Grid from "@material-ui/core/Grid";


const TestStorage = () => <h1>Hello, World!</h1>
export default TestStorage