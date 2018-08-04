import React from 'react';
import Host from './Host.js';
import Ports from './Ports.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

class ScanResult extends React.Component {
    hostState(hostState) {
        if (hostState === "up") {
            return <FontAwesomeIcon icon={faCheckCircle} className="ml-3"/>;
        }

        return <FontAwesomeIcon icon={faTimesCircle} className="ml-3"/>;
    }

    render() {
        return (
            <section className="mt-3">
                <h2>Scan Result {this.hostState(this.props.scanResult.state)}</h2>
                <Ports ports={this.props.scanResult.ports} />
                <Host state={this.props.scanResult.state} 
                    addresses={this.props.scanResult.addresses}
                    hosts={this.props.scanResult.hostnames} />

            </section>
        );
    }
}

export default ScanResult;