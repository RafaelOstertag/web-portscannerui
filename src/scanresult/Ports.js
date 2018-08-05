import React from "react";
import PropTypes from "prop-types";

class Ports extends React.Component {
    explodePorts(ports) {
        if (!ports) {
            return null;
        }

        return ports.map(item => {
            return (
                <tr key={item.number.toString()}>
                    <td>{item.number}</td>
                    <td>{item.state}</td>
                    <td>{item.name}</td>
                </tr>
            );
        });
    }
    render() {
        return (
            <section className="mt-2">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Port</th>
                            <th>State</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>{this.explodePorts(this.props.ports)}</tbody>
                    <tfoot />
                </table>
            </section>
        );
    }
}

Ports.propTypes = {
    ports: PropTypes.array.isRequired
};

export default Ports;
