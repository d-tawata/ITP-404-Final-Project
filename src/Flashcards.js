import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Bookmark from "./Bookmark";

export default class Flashcards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            flashcards: [],
            isModalOpen: false,
            num: 1
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
                        {this.state.flashcards.reverse().map((flashcard) => {
                            return (
                                <tr key={flashcard.id}>
                                    <th scope="row"><Link to={`/flashcards/${flashcard.id}`}>{this.state.num++}</Link></th>
                                    <td>{flashcard.title}</td>
                                    <td>{flashcard.body}</td>
                                    <td>
                                        <Bookmark
                                            flashcard={flashcard}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* <div className="Flashcards">
                    <button
                        type="button"
                        onClick={() => {
                            this.setState({ isModalOpen: true });
                        }}
                    >
                        Open modal
                    </button>

                    {this.state.isModalOpen && (
                        <Modal
                            title="My modal title"
                            body={() => {
                                return <p>Modal body text goes here.</p>;
                            }}
                            onClose={() => {
                                this.setState({ isModalOpen: false });
                            }}
                        />
                    )}
                </div>
                <div id="modal-container"></div> */}
            </>
        );
    }
}
