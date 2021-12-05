import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./Navigation";
import Posts from "./Posts";
import Post from "./Post";
import CreatePostForm from "./CreatePostForm";
import EditPostForm from "./EditPostForm";

import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navigation />

          <Switch>
            <Route path="/about">
              <div>About page here...</div>
            </Route>
            <Route path="/contact">
              <div>Contact page here...</div>
            </Route>
            <Route path="/posts/new" component={CreatePostForm} />
            <Route path="/posts/:postId/edit" component={EditPostForm} />
            <Route path="/posts/:postId" component={Post} />
            <Route path="/">
              <Posts />
            </Route>
          </Switch>
        </div>
        <ToastContainer />
      </Router>
    );
  }
}
