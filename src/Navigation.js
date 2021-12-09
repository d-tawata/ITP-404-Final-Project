import React from "react";
import { NavLink } from "react-router-dom";

export default class Navigation extends React.Component {
    render() {
        return (
            <nav>
                <div className="row">
                    <h1 className="mx-auto col-auto display-1">My Flashcards</h1>
                </div>

                <ul className="nav nav-tabs justify-content-center my-3">
                    <li className="nav-item">
                        <NavLink exact className="nav-link" to="/">
                            Flashcards List View
                        </NavLink>
                    </li>
                    {/* <li className="nav-item">
                        <NavLink exact className="nav-link" to="/study">
                            Study Mode
                        </NavLink>
                    </li> */}
                    <li className="nav-item">
                        <NavLink exact className="nav-link" to="/flashcards/new">
                            Create a New Flashcard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact className="nav-link" to="/favorites">
                            Favorites
                        </NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}
