import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { getPost } from '../graphql/queries'

const ViewPost = ({ id }) => {
  const [post, setPost] = useState('')

  useEffect(() => { queryPostById() })

  const queryPostById = async () => {
    const res = await API.graphql(graphqlOperation(getPost, { id }))
    setPost(res.data.getPost)
  }

  if (!post) { return <div>Loading....</div> }

  return (
    <>
      <h1>{post.title}</h1>
      <div>
        <span>By <b>{post.owner}</b></span>
      </div>
      <p>{post.content}</p>
      <ul>
        {post.comments.items.map(com => (<li>{com.content}</li>))}
      </ul>
    </>
  )
}

export default ViewPost