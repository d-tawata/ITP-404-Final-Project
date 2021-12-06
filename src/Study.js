import React from "react";
import { Link } from "react-router-dom";

export default class Study extends React.Component {
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

        document.title = "Study Mode";
    }

    render() {
        const progressStyle1 = {
            height: '5px'
        }
        const progressStyle2 = {
            width: '25%'
        }
        return (
            <>
                <h3>Study Mode</h3>
                <div className="progress" style={progressStyle1}>
                    <div className="progress-bar" role="progressbar" style={progressStyle2} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <table className="table table-hover">
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
                                    <td>{flashcard.favorite ? "favorite" : "not favorite"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </>
        );
    }
}