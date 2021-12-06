import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

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
                <div className="row">
                    <div className="col-auto">
                        {this.state.flashcard.favorite ?
                            <FontAwesomeIcon
                                icon={faBookmark}
                                color="maroon"
                                size="3x"
                            /> :
                            <FontAwesomeIcon
                                icon={farBookmark}
                                color="maroon"
                                size="3x"
                            />}
                    </div>
                    <h1 className="col mb-3">{this.state.flashcard.title}</h1>
                </div>
                <p>{this.state.flashcard.body}</p>
                <div className="row">
                    <Link
                        className="btn btn-secondary col-auto"
                        to={`/flashcards/${this.props.match.params.flashcardId}/edit`}
                    >
                        Edit
                    </Link>
                    <button
                        type="button"
                        className="btn btn-danger mx-3 col-auto"
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
