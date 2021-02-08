import React from 'react';
import ReactDOM from 'react-dom';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_details: "Loading",
            user_enigmas: "Loading"
        };
    }

    componentDidMount() {
        console.log("Loading...");
        $.get( 'web_api/details').done( res => { this.setState( { user_details: res } ); });
        $.get( 'web_api/enigmas').done( res => { this.setState( { user_enigmas: res } ); });
    }  

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Ciao { JSON.stringify(this.state.user_details) } </div>
    
                            <div className="card-body">I tuoi enigmi sono { JSON.stringify(this.state.user_enigmas) } </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default Home;

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}
