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
                this.setState({
                    flashcard: json
                });
            });
    };

    onFavoriteClick() {
        fetch(
            `https://itp-404-final-project-api.herokuapp.com/api/flashcards/${this.state.flashcard.id}`,
            {
                method: "PUT",
                body: JSON.stringify({
                    favorite: this.state.flashcard.favorite
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        )
            .then((response) => response.json())
            .then((json) => {
                console.log(this.state.flashcard.favorite);
                this.setState({
                    favorite: !this.state.flashcard.favorite
                });

                toast.success(`Flashcard "${json.title}" was favorited`);
                //this.props.history.push("/");
            });
    }

    render() {
        return (
            <>
                <button
                    type="button"
                    className="btn btn-link"
                //onClick={() => {
                //    this.onFavoriteClick();
                //}}
                >
                    <FontAwesomeIcon
                        //icon={flashcard.favorite ? faBookmark : farBookmark}
                        icon={farBookmark}
                        color="maroon"
                        size="2x"
                    />
                </button>
            </>
        );
    }
}
