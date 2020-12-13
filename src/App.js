import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Ship from './Components/Ship';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = { ships: [] };
    }

    async componentDidMount() {
        //call API for ships, create DOM elements
        console.log('set shipList');
        const results1 = await axios.get('http://swapi.dev/api/starships/');
        const list1 = results1.data.results;
        const results2 = await axios.get(
            'http://swapi.dev/api/starships/?page=2'
        );
        const list2 = results2.data.results;
        const results3 = await axios.get(
            'http://swapi.dev/api/starships/?page=3'
        );
        const list3 = results3.data.results;
        const results4 = await axios.get(
            'http://swapi.dev/api/starships/?page=4'
        );
        const list4 = results4.data.results;
        const masterlist = list1.concat(list2, list3, list4);
        this.setState({
            ships: masterlist
        });
    }

    render() {
        const shipList = this.state.ships.map((ship, index) => {
            return (
                <div className="ship" key={`ship ${index}`}>
                    <Link className="shipLink" to={`/${index}`}>
                        {ship.name}
                    </Link>
                    <Route
                        path={`/${index}`}
                        render={() => {
                            return <Ship ship={ship} />;
                        }}
                    />
                </div>
            );
        });

        return (
            <BrowserRouter>
                <div className="App">
                    <h1 className="header">STARWARS STAR SHIPS</h1>
                    <div className="ship-grid">{shipList}</div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
