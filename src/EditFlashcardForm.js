import React from "react";
import { toast } from "react-toastify";
import Modal from "./ModalTerms";

export default class EditFlashcardForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            body: ""
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleBodyChange(event) {
        this.setState({ body: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch(
            `https://itp-404-final-project-api.herokuapp.com/api/flashcards/${this.props.match.params.flashcardId}`,
            {
                method: "PUT",
                body: JSON.stringify({
                    title: this.state.title,
                    body: this.state.body
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        )
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    title: "",
                    body: ""
                });

                toast.success(`Flashcard "${json.title}" was successfully updated`);
                this.props.history.push("/");
            });
    }

    componentDidMount() {
        const id = this.props.match.params.flashcardId;
        //console.log(this.props.match);
        fetch(`https://itp-404-final-project-api.herokuapp.com/api/flashcards/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState(json);
            });

        document.title = "Edit Flashcard";
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit} className="needs-validation">
                    <h3>Edit Flashcard</h3>
                    <div className="my-3">
                        <label htmlFor="title" className="form-label">
                            Front
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.title}
                            onChange={this.handleTitleChange}
                            placeholder="Word"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="body" className="form-label">
                            Back
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="body"
                            rows="3"
                            value={this.state.body}
                            onChange={this.handleBodyChange}
                            placeholder="Definition"
                            required
                        />
                    </div>

                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                        <label className="form-check-label" htmlFor="invalidCheck">
                            Agree to Terms & Conditions.
                        </label>
                    </div>

                    <div className="CreateFlashcardForm mb-3">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                                this.setState({ isModalOpen: true });
                            }}
                        >
                            See Terms & Conditions
                        </button>

                        {this.state.isModalOpen && (
                            <Modal
                                title="Flashcards App Terms & Conditions"
                                body={() => {
                                    return <p>You agree to losing this card's bookmarked status if it exists, as well as losing your flashcard data after exiting the browser.</p>;
                                }}
                                onClose={() => {
                                    this.setState({ isModalOpen: false });
                                }}
                            />
                        )}
                    </div>
                    <div id="modal-container"></div>
                    <button type="submit" className="btn btn-dark">
                        Update
                    </button>
                </form>
            </>
        );
    } asd
}
