import React from "react";
import { Link } from "react-router-dom";

export default class Flashcards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: []
        };
    }

    componentDidMount() {
        fetch(
            "https://itp-404-final-project-api.herokuapp.com/api/comments?_sort=id&_order=desc"
        )
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({ comments: json });
            });
    }

    render() {
        return (
            <>
                <h5>Comments</h5>
                <ul reversed>
                    {this.state.comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <figure>
                                    <blockquote className="blockquote">
                                        <p>{comment.body}</p>
                                    </blockquote>
                                    <figcaption className="blockquote-footer">
                                        {comment.author}<cite title="timestamp">{comment.timestamp}</cite>
                                    </figcaption>
                                </figure>
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    }
}
