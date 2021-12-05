import React from "react";
import { Link } from "react-router-dom";

export default class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        fetch(
            "https://itp-404-final-project-api.herokuapp.com/api/posts?_sort=id&_order=desc"
        )
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({ posts: json });
            });
    }

    render() {
        return (
            <>
                <ol reversed>
                    {this.state.posts.map((post) => {
                        return (
                            <li key={post.id}>
                                <Link to={`/posts/${post.id}`}>{post.title}</Link>
                            </li>
                        );
                    })}
                </ol>
            </>
        );
    }
}
