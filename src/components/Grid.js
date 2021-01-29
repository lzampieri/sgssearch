import React from 'react';
import Card from './Card';

class Grid extends React.Component {
    render() {
        return <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 g-3"> { this.props.items.map( (i) =>
            <Card key={i} name={i} />
        ) }</div>;
    }
}

export default Grid;