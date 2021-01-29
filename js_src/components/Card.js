class Card extends React.Component {
    render() {
        return <div className="col">
            <div className="card alert-info">
                <div class="card-header">
                    <h1>{this.props.item.id}</h1>
                </div>
                <div class="card-body">
                    {this.props.item.name}
                </div>
            </div>
        </div>;
    }
}

export default Card;