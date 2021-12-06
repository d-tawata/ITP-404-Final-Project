import React from "react";
import { Link } from "react-router-dom";

export default class Favorites extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            flashcards: []
        };
    }

    componentDidMount() {
        fetch(
            "https://itp-404-final-project-api.herokuapp.com/api/flashcards?_sort=id&_order=desc"
        )
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({ flashcards: json });
            });
    }

    render() {
        return (
            <>
                <ol reversed>
                    {this.state.flashcards.map((flashcard) => {
                        if (flashcard.favorite) {
                            return (
                                <li key={flashcard.id}>
                                    <Link to={`/flashcards/${flashcard.id}`}>{flashcard.title}</Link>
                                </li>
                            );
                        } else { return; }
                    })}
                </ol>
            </>
        );
    }
}