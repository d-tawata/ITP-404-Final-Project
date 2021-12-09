import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Bookmark from "./Bookmark";

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
            })
            .then(() => {
                document.title = this.state.flashcard.title || "Flashcard";
            });
        document.title = this.state.flashcard.title || "Flashcard";
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
                    <div className="col-1">
                        <Bookmark
                            flashcard={this.state.flashcard}
                            size="3x"
                        />
                    </div>
                    <h1 className="col-auto mb-3">{this.state.flashcard.title}</h1>
                </div>
                <div className="row">
                    <div className="col-1"></div>
                    <p className="col-auto">{this.state.flashcard.body}</p>
                </div>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-auto">
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
                </div>
                <div className="row mt-3">
                    <img src="https://images.unsplash.com/photo-1504507926084-34cf0b939964?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" className="img-fluid justify-content-center mx-auto col-auto" alt="Pencils on light background"></img>
                </div>
            </>
        );
    }
}
