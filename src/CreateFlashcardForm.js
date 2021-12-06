import React from "react";
import { toast } from "react-toastify";

export default class CreateFlashcardForm extends React.Component {
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

        fetch("https://itp-404-final-project-api.herokuapp.com/api/flashcards", {
            method: "POST",
            body: JSON.stringify({
                title: this.state.title,
                body: this.state.body
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    title: "",
                    body: ""
                });

                toast.success(`Flashcard "${json.title}" was successfully created`);
                this.props.history.push("/");
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="my-3">
                    <label htmlFor="name" className="form-label">
                        Title
                    </label>

                    <input
                        type="title"
                        className="form-control"
                        id="title"
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="body" className="form-label">
                        Body
                    </label>
                    <textarea
                        className="form-control"
                        id="body"
                        rows="3"
                        value={this.state.body}
                        onChange={this.handleBodyChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        );
    }
}
