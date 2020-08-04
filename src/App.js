import React from 'react'
import Home from './components/Home'
import Post from './components/Post'
import EditPost from './components/EditPost'
import ViewPost from './components/ViewPost'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

const App = () => (
  <Router>
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts/new">Create Post</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/posts/new">
          <Post />
        </Route>
        <Route path="/posts/edit/:id">
          <EditPost />
        </Route>
        <Route path="/posts/:id">
          <ViewPost />
        </Route>
      </Switch>
    </>
  </Router>
)


export default App