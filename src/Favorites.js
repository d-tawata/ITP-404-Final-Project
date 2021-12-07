import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

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

        document.title = "Favorites";
    }

    render() {
        return (
            <>
                <div className="row">
                    <div className="col-auto">
                        <FontAwesomeIcon
                            icon={faBookmark}
                            color="maroon"
                            size="2x"
                        />
                    </div>
                    <h3 className="col text-left">Favorites</h3>
                </div>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Front</th>
                            <th scope="col">Back</th>
                            <th scope="col">Time Favorited</th>
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
                                        <td>{flashcard.favoriteTimestamp}</td>
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