import React, { useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createPost } from '../graphql/mutations'

const Post = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    const input = { title, content }
    await API.graphql(graphqlOperation(createPost, { input }))
    setTitle('')
    setContent('')
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

export default Post