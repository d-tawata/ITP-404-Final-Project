import React from "react";
import { toast } from "react-toastify";

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
        const id = this.props.match.params.postId;
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
                <form onSubmit={this.handleSubmit} className="needs-validation" novalidate>
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
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please input text here.
                        </div>
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
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please input text here.
                        </div>
                    </div>
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                        <label class="form-check-label" for="invalidCheck">
                            Agree to losing data after exiting browser.
                        </label>
                        <div class="invalid-feedback">
                            You must agree before submitting.
                        </div>
                    </div>
                    <button type="submit" className="btn btn-secondary">
                        Update
                    </button>
                </form>
            </>
        );
    } asd
}
