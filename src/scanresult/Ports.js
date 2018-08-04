import React from 'react'

class Ports extends React.Component {
    explodePorts(ports) {
        if (!ports) {
            return null
        }

        return ports.map(item => {
            return (<div className="row" key={item.number.toString()}>
                <div className="col-sm-4">
                {item.number}
                </div>
                <div className="col-sm-4">
                {item.state}
                </div>
                <div className="col-sm-4">
                {item.name}
                </div>
            </div>)
        })
    }
    render() {
        return (
            <section>
            <h3>Discovered Ports</h3>
            {this.explodePorts(this.props.ports)}
            </section>
        )
    }
}

export default Ports