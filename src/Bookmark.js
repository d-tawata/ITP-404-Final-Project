import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "./ModalTerms";

export default class Bookmark extends React.Component {
    constructor(props) {
        super(props);
    }

    onFavoriteClick() {
        const flashcard = this.props.flashcard;
        fetch(
            `https://itp-404-final-project-api.herokuapp.com/api/flashcards/${flashcard.id}`,
            {
                method: "PUT",
                body: JSON.stringify({
                    favorite: !flashcard.favorite,
                    title: flashcard.title,
                    body: flashcard.body
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        )
            .then(() => {
                !flashcard.favorite ?
                    toast.success(`Flashcard "${flashcard.title}" was favorited`)
                    :
                    toast.success(`Flashcard "${flashcard.title}" was unfavorited`);
                //this.props.history.push("/");
            });
    }

    render() {
        return (
            <>
                <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => {
                        this.onFavoriteClick();
                    }}
                >
                    <FontAwesomeIcon
                        icon={this.props.flashcard.favorite ? faBookmark : farBookmark}
                        //icon={farBookmark}
                        color="maroon"
                        size="2x"
                    />
                </button>
            </>
        );
    }
}
