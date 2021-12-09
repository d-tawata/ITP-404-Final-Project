import React from "react";

export default class NoMatch extends React.Component {
    componentDidMount() {
        document.title = "404 Page"
    }

    render() {
        return (
            <>
                <div className="text-center">
                    <h1>404</h1>
                    <h3>Page Not Found</h3>
                </div>
            </>
        );
    }
}
