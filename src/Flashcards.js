import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

export default class Flashcards extends React.Component {
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

        document.title = "Flashcards List View";
    }

    onFavoriteClick(flashcard) {
        console.log("start");
        console.log(flashcard);
        fetch(
            `https://itp-404-final-project-api.herokuapp.com/api/flashcards/${flashcard}`,
            {
                method: "PUT",
                body: JSON.stringify({
                    favorite: flashcard.favorite
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        )
            .then((response) => response.json())
            .then((json) => {
                console.log(flashcard.favorite);
                this.setState({
                    favorite: !flashcard.favorite
                });

                toast.success(`Flashcard "${json.title}" was favorited`);
                //this.props.history.push("/");
            });
    }

    render() {
        return (
            <>
                <h3>Flashcards</h3>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Front</th>
                            <th scope="col">Back</th>
                            <th scope="col">Favorite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.flashcards.map((flashcard) => {
                            return (
                                <tr key={flashcard.id}>
                                    <th scope="row"><Link to={`/flashcards/${flashcard.id}`}>{flashcard.id}</Link></th>
                                    <td>{flashcard.title}</td>
                                    <td>{flashcard.body}</td>
                                    {/* <td>{flashcard.favorite ?
                                        <FontAwesomeIcon
                                            icon={faBookmark}
                                            color="maroon"
                                            size="2x"
                                        /> :
                                        <FontAwesomeIcon
                                            icon={farBookmark}
                                            color="maroon"
                                            size="2x"
                                        />}
                                    </td> */}
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-link"
                                            onClick={() => {
                                                this.onFavoriteClick(flashcard);
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={flashcard.favorite ? faBookmark : farBookmark}
                                                color="maroon"
                                                size="2x"
                                            />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </>
        );
    }
}
