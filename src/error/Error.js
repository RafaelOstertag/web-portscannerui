import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';

class Error extends React.Component {
    render() {
        return (
            <section className="mt-3">
                <p className="alert alert-danger blockquote text-center">
                    <FontAwesomeIcon icon={faFrown} className="mr-3"/> {this.props.errorMessage}
                </p>
            </section>
        )
    }

}

export default Error