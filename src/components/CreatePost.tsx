import React from 'react';

import { withRouter } from "react-router-dom";

const CreatePost = () => {
    return (
        <div>
            Create post
        </div>
    );
}

export const CreatePostWithRouter = withRouter(CreatePost);