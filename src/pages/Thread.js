import React from 'react'
import PostPage from '../shared/ForPosts/Posts/PostPage'
import { useParams } from 'react-router-dom';
const Thread = () => {

    const postId= useParams().Tid;
    return (
            <PostPage  Pid={postId} />
    )
}

export default Thread
