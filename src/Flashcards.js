import React from "react";
import { Link } from "react-router-dom";

export default class Flashcards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            flashcards: []
        };
    }

    componentDidMount() {
        fetch(
            "https://itp-404-final-project-api.herokuapp.com/api/posts?_sort=id&_order=desc"
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
                        return (
                            <li key={flashcard.id}>
                                <Link to={`/posts/${flashcard.id}`}>{flashcard.title}</Link>
                            </li>
                        );
                    })}
                </ol>
            </>
        );
    }
}
