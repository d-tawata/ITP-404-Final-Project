import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./Navigation";
import Flashcards from "./Flashcards";
import Flashcard from "./Flashcard";
import Favorites from "./Favorites";
import Study from "./Study";
import CreateFlashcardForm from "./CreateFlashcardForm";
import EditFlashcardForm from "./EditFlashcardForm";
import NoMatch from "./NoMatch";

import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navigation />

          <Switch>
            <Route exact path="/favorites">
              <Favorites />
            </Route>
            <Route exact path="/study">
              <Study />
            </Route>
            <Route exact path="/flashcards/new" component={CreateFlashcardForm} />
            <Route exact path="/flashcards/:flashcardId/edit" component={EditFlashcardForm} />
            <Route exact path="/flashcards/:flashcardId" component={Flashcard} />
            <Route exact path="/">
              <Flashcards />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
        <ToastContainer />
      </Router>
    );
  }
}
