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

        this.state = {
            color: "maroon",
            size: "2x"
        };
    }

    onFavoriteClick() {
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;

        //console.log(dateTime);

        const flashcard = this.props.flashcard;
        fetch(
            `https://itp-404-final-project-api.herokuapp.com/api/flashcards/${flashcard.id}`,
            {
                method: "PUT",
                body: JSON.stringify({
                    favorite: !flashcard.favorite,
                    title: flashcard.title,
                    body: flashcard.body,
                    favoriteTimestamp: !flashcard.favorite ? dateTime : ""
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
                        color={this.props.color || this.state.color}
                        size={this.props.size || this.state.size}
                    />
                </button>
            </>
        );
    }
}
