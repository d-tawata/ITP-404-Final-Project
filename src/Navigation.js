import React from "react";
import { Link, NavLink } from "react-router-dom";

export default class Navigation extends React.Component {
    render() {
        return (
            <nav>
                <ul className="nav nav-tabs justify-content-center my-3">
                    <li className="nav-item">
                        <NavLink exact className="nav-link" to="/">
                            Flashcards List View
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact className="nav-link" to="/study">
                            Study Mode
                        </NavLink>
                    </li>
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
