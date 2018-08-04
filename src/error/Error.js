import React from 'react'

class Error extends React.Component {
    render() {
        return (
            <section>
                <div className="alert alert-danger">
                    The Portscanner Gods spoke in anger
                    <blockquote className="blockquote">
                    {this.props.errorMessage}
                    </blockquote>
                </div>
            </section>
        )
    }

}

export default Error