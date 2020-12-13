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
            isLoading: false,
            error: false
        };
    }
    async componentDidMount() {
        let pilots = this.props.location.state.pilots;
        let pilotCalls = [];
        if (pilots.length === 0) {
            pilots = [];
        } else {
            //call for names later
            try {
                this.setState({ isLoading: true });
                pilots.forEach((pilotUrl) => {
                    pilotCalls.push(axios.get(pilotUrl));
                });
                pilots = await Promise.all(pilotCalls);
                this.setState({ pilots: pilots, isLoading: false });
            } catch (error) {
                this.setState({ error: true });
            }
        }
    }

    /* from previous set up
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
    */

    render() {
        const ship = this.props.location.state;
        let pilotNames = 'No pilots found';
        if (this.state.pilots.length !== 0) {
            pilotNames = this.state.pilots.map((pilot) => {
                return <li key={pilot.data.name}>{pilot.data.name}</li>;
            });
        }

        return (
            <div id="detail" className="ship">
                {this.state.isLoading ? <h1>LOADING SHIPS . . .</h1> : null}
                {this.state.error ? (
                    <h1>
                        We've experienced and error, please try reloading the
                        page.
                    </h1>
                ) : null}
                <p>NAME: {ship.name}</p>
                <p>MODEL: {ship.model}</p>
                <ul>PILOTS: {pilotNames}</ul>
                <Link className="shipLink" to="/">
                    {'<< '} RETURN TO LIST
                </Link>
            </div>
        );
    }
}

export default StarshipPage;
