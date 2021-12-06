import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default class Flashcard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            flashcard: {}
        };
    }

    componentDidMount() {
        const id = this.props.match.params.flashcardId;
        fetch(`https://itp-404-final-project-api.herokuapp.com/api/flashcards/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({ flashcard: json });
            });
    }

    deleteFlashcard() {
        const isDeleteConfirmed = window.confirm(
            "Are you sure you want to delete this flashcard?"
        );

        if (!isDeleteConfirmed) {
            return;
        }

        fetch(
            `https://itp-404-final-project-api.herokuapp.com/api/flashcards/${this.state.flashcard.id}`,
            {
                method: "DELETE"
            }
        ).then((json) => {
            toast.success(`Flashcard "${this.state.flashcard.title}" was deleted`);
            this.props.history.push("/");
        });
    }

    render() {
        return (
            <>
                <h1>{this.state.flashcard.title}</h1>
                <p>{this.state.flashcard.body}</p>
                <p>Favorite: {this.state.flashcard.favorite ? "yes" : "no"}</p>
                <div className="btn-group">
                    <Link
                        className="btn btn-primary"
                        to={`/flashcards/${this.props.match.params.flashcardId}/edit`}
                    >
                        Edit
                    </Link>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                            this.deleteFlashcard();
                        }}
                    >
                        Delete
                    </button>
                </div>
            </>
        );
    }
}
