import React from 'react';

class Card extends React.Component {
    render() {
        return <div className="col">
            <div className="card alert-info">
                Ciao, {this.props.name}
            </div>
        </div>;
    }
}

export default Card;

// col-lg-2 col-md-4 col-12 h-100