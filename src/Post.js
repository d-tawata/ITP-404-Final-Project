import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {}
        };
    }

    componentDidMount() {
        const id = this.props.match.params.postId;
        fetch(`https://json-server-posts-api.herokuapp.com/api/posts/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({ post: json });
            });
    }

    deletePost() {
        const isDeleteConfirmed = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!isDeleteConfirmed) {
            return;
        }

        fetch(
            `https://itp-404-final-project-api.herokuapp.com/api/posts/${this.state.post.id}`,
            {
                method: "DELETE"
            }
        ).then((json) => {
            toast.success(`Post "${this.state.post.title}" was deleted`);
            this.props.history.push("/");
        });
    }

    render() {
        return (
            <>
                <h1>{this.state.post.title}</h1>
                <p>{this.state.post.body}</p>
                <div className="btn-group">
                    <Link
                        className="btn btn-primary"
                        to={`/posts/${this.props.match.params.postId}/edit`}
                    >
                        Edit
                    </Link>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                            this.deletePost();
                        }}
                    >
                        Delete
                    </button>
                </div>
            </>
        );
    }
}
