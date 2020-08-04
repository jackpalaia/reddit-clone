import React, { useState, useEffect } from 'react'
import { withAuthenticator } from 'aws-amplify-react'
import { API, graphqlOperation } from 'aws-amplify'
import { listPosts } from '../graphql/queries'
import { deletePost } from '../graphql/mutations'
import { Link } from "react-router-dom"

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => { getPosts() }, [])

  const getPosts = async () => {
    try {
      const res = await API.graphql(graphqlOperation(listPosts))
      setPosts(res.data.listPosts.items)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteSelected = async id => {
    const input = { id }
    const deleted = await API.graphql(graphqlOperation(deletePost, { input }))
    const newPosts = posts.filter(p => p.id !== id)
    setPosts(newPosts)
    console.log('Post deleted', deleted)
  }

  return (
    <>
      <ul>
        {posts.map(p => (
          <li>
            <h4><Link to={`/posts/${p.id}`}>{p.title}</Link></h4>
            <span>By {p.owner}</span>
            <div>
              <button onClick={() => deleteSelected(p.id)}>delete</button>
              <Link to={`/posts/edit/${p.id}`}>Edit</Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default withAuthenticator(Home)