import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class Home extends Component {
    constructor() {
        super();
        this.state = { ships: [], isLoading: false };
    }

    async componentDidMount() {
        //call API for ships, create DOM elements
        this.setState({ isLoading: true });
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
            ships: masterlist,
            isLoading: false
        });
    }

    render() {
        const shipList = this.state.ships.map((ship) => {
            let index = ship.url.split('/')[5];
            return (
                <div className="ship" key={`ship ${index}`}>
                    <Link
                        className="shipLink"
                        to={{ pathname: `/${index}`, state: ship }}>
                        {ship.name}
                    </Link>
                </div>
            );
        });

        return (
            <>
                {this.state.isLoading ? <h1>LOADING SHIPS . . . </h1> : null}
                <div className="ship-grid">{shipList}</div>
            </>
        );
    }
}

export default Home;
