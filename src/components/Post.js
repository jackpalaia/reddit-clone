import React, { useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createPost } from '../graphql/mutations'

function Post() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      let input = {
        title,
        content
      }
      let newPost = await API.graphql(graphqlOperation(createPost, { input }))
      setTitle('')
      setContent('')
      console.log('new post created ->>', newPost)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
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
    </div>
  )
}

export default Post