import React from 'react';
import Host from './Host.js';
import Ports from './Ports.js'

class ScanResult extends React.Component {
    render() {
        return (
            <section>
                <h2>Scan Result</h2>
                <Host state={this.props.scanResult.state} 
                    addresses={this.props.scanResult.addresses}
                    hosts={this.props.scanResult.hostnames} />
                <Ports ports={this.props.scanResult.ports} />
            </section>
        );
    }
}

export default ScanResult;