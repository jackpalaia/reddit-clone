import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { updatePost } from '../graphql/mutations'
import { getPost } from '../graphql/queries'

const EditPost = ({ id }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => { queryPost() })

  const queryPost = async () => {
    const res = await API.graphql(graphqlOperation(getPost, { id }))
    setTitle(res.data.getPost.title)
    setContent(res.data.getPost.content)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const input = {
        id,
        title,
        content
      }
      const newPost = await API.graphql(graphqlOperation(updatePost, { input }))
      setTitle('')
      setContent('')
      console.log('Post Updated: ', newPost)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
          </label>
        </div>
        <div>
          <label>
            Content:
            <textarea type="text" value={content} onChange={({ target }) => setContent(target.value)} />
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default EditPost