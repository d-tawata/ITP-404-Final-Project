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
                <p>Please refresh after clicking on the bookmark to see the updated icon.</p>
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

                <div className="row">
                    <img src="https://images.unsplash.com/photo-1513708929605-6dd0e1b081bd?fit=max&fm=jpg&ixid=MXwzNTY3MHwwfDF8YWxsfHx8fHx8fHw&ixlib=rb-1.2.1&q=75&w=720&utm_medium=referral&utm_source=vocal.media" className="img-fluid justify-content-center mx-auto col-auto" alt="Pencils on dark background"></img>
                </div>
            </>
        );
    }
}
