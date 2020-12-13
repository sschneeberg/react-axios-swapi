import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';

class StarshipPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            model: '',
            pilots: [],
            isLoading: false
        };
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        console.log('get ship info');
        const response = await axios.get(
            `http://swapi.dev/api/starships/${this.props.id}/`
        );
        let pilots = response.data.pilots;
        if (pilots.length === 0) {
            pilots = 'No pilots found';
        } else {
            //call for names later
            pilots = pilots.length;
        }

        this.setState({
            name: response.data.name,
            model: response.data.model,
            pilots: pilots,
            isLoading: false
        });
    }

    render() {
        return (
            <div id="detail" className="ship">
                {this.state.isLoading ? <h1>LOADING SHIPS . . .</h1> : null}
                <p>NAME: {this.state.name}</p>
                <p>MODEL: {this.state.model}</p>
                <p>PILOTS: {this.state.pilots}</p>
                <Link className="shipLink" to="/">
                    {'<< '} RETURN TO LIST
                </Link>
            </div>
        );
    }
}

export default StarshipPage;
