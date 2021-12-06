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
                <h3>Favorites</h3>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Front</th>
                            <th scope="col">Back</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.flashcards.map((flashcard) => {
                            if (flashcard.favorite) {
                                return (
                                    <tr key={flashcard.id}>
                                        <th scope="row"><Link to={`/flashcards/${flashcard.id}`}>{flashcard.id}</Link></th>
                                        <td>{flashcard.title}</td>
                                        <td>{flashcard.body}</td>
                                    </tr>
                                );
                            } else { return; }
                        })}
                    </tbody>
                </table>
            </>
        );
    }
}