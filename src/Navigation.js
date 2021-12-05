import React from "react";
import { Link, NavLink } from "react-router-dom";

export default class Navigation extends React.Component {
    render() {
        return (
            <nav>
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <NavLink exact className="nav-link" to="/">
                            Posts
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact className="nav-link" to="/posts/new">
                            Write a Post
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact className="nav-link" to="/about">
                            About
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact className="nav-link" to="/contact">
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}
