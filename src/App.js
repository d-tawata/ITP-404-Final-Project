import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./Navigation";
import Flashcards from "./Flashcards";
import Comments from "./Comments";
import Flashcard from "./Flashcard";
import Favorites from "./Favorites";
import Study from "./Study";
import CreateFlashcardForm from "./CreateFlashcardForm";
import EditFlashcardForm from "./EditFlashcardForm";

import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navigation />

          <Switch>
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/study">
              <Study />
            </Route>
            <Route path="/flashcards/new" component={CreateFlashcardForm} />
            <Route path="/flashcards/:flashcardId/edit" component={EditFlashcardForm} />
            <Route path="/flashcards/:flashcardId" component={Flashcard} />
            <Route path="/">
              <Flashcards />
              <Comments />
            </Route>
          </Switch>
        </div>
        <ToastContainer />
      </Router>
    );
  }
}
