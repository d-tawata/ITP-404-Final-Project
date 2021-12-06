import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./Navigation";
import Flashcards from "./Flashcards";
import Flashcard from "./Flashcard";
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
              <div>Favorites page here...</div>
            </Route>
            <Route path="/study">
              <div>Study page here...</div>
            </Route>
            <Route path="/flashcards/new" component={CreateFlashcardForm} />
            <Route path="/flashcards/:flashcardId/edit" component={EditFlashcardForm} />
            <Route path="/flashcards/:flashcardId" component={Flashcard} />
            <Route path="/">
              <Flashcards />
            </Route>
          </Switch>
        </div>
        <ToastContainer />
      </Router>
    );
  }
}
